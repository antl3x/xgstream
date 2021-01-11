import { Account } from '@modules/Betfair/Account/Account';
import { LogService } from '@shared/services/LogService';
import Logger from 'bunyan';
import tls from 'tls';
import {
  StreamMessage,
  StreamMessageConnection,
  StreamMessageFailure,
  StreamMessageMarketChange,
  StreamMessageOrderChange,
  StreamMessageRequestMarketsSubscription,
  StreamMessageRequestOrdersSubscription,
  StreamMessageSuccess,
} from '..';
import {
  createMarketsSubscription,
  MarketsSubscription,
} from './MarketsSubscription';
import {
  createOrdersSubscription,
  OrdersSubscription,
} from './OrdersSubscription';

type StreamConnectionProps = {
  id?: number;
  account: Account;
  socketEndpoint?: keyof typeof HOSTS;
  socketTimeout?: number;
  marketsSubscription?: MarketsSubscription;
  ordersSubscription?: OrdersSubscription;
  logLevel?: Logger.LogLevel;
};

interface StreamConnection {
  id: () => number;
  account: () => Account;
  subscribeToMarkets: (
    i: Omit<StreamMessageRequestMarketsSubscription, 'op'>
  ) => void;
  subscribeToOrders: (
    i: Omit<StreamMessageRequestOrdersSubscription, 'op'>
  ) => void;
}

const HOSTS = {
  LIVE: 'stream-api.betfair.com',
  INTEGRATION: 'stream-api-integration.betfair.com',
};

export const createStreamConnection = ({
  id = 0,
  socketEndpoint = 'LIVE',
  socketTimeout = 5000,
  marketsSubscription = createMarketsSubscription ({}),
  ordersSubscription = createOrdersSubscription ({}),
  ...props
}: StreamConnectionProps): StreamConnection => {
  const log = LogService.child ({
    module: 'Betfair',
    sub: 'StreamConnection',
  });
  let socketBuffer = '';
  let connectionId;
  let isConnectionClosed: boolean;
  let connectionsAvailable: number;
  let socketConnection: tls.TLSSocket;
  let lastMessageReceivedAt: Date;
  let messagesReceivedCount: number;

  _init ();

  function _init() {
    _createSocketConnection ();
    _authenticateSocketConnection ();
    _listenSocketConnection ();

    if (props.logLevel) {
      log.addStream ({ stream: process.stdout, level: props.logLevel });
    }
  }

  function _createSocketConnection() {
    socketConnection = tls.connect (443, HOSTS[socketEndpoint], {
      timeout: socketTimeout,
    });
    log.debug ('socket connection created');
  }

  function _authenticateSocketConnection() {
    socketConnection.write (
      `${JSON.stringify ({
        op: 'authentication',
        id: _nextId (),
        appKey: props.account.apiKey (),
        session: props.account.sessionToken (),
      })}\r\n`
    );
    log.debug ('socket authentication sent');
  }

  function _listenSocketConnection() {
    socketConnection.on ('data', function (bufferData) {
      log.debug ('socket raw data received', bufferData.toString ());
      lastMessageReceivedAt = new Date ();
      socketBuffer += bufferData.toString ('utf8');

      const messagesToProccess = socketBuffer.split ('\r\n').slice (0, -1);
      const isStreamEndMessage =
        bufferData.toString ('utf8').slice (-2) === '\r\n';

      if (isStreamEndMessage) {
        for (const msg of messagesToProccess) {
          messagesReceivedCount += 1;
          _processMessage (JSON.parse (msg));
        }
        socketBuffer = '';
      }
    });
  }

  function _processMessage(msg: StreamMessage) {
    if (msg.op === 'connection') {
      _onConnectionMessage (msg);
    }
    if (msg.op === 'status' && msg.statusCode === 'SUCCESS') {
      _onSuccessMessage (msg);
    }

    if (msg.op === 'status' && msg.statusCode === 'FAILURE') {
      _onFailureMessage (msg);
    }

    if (msg.op === 'mcm') {
      _onMarketChangeMessage (msg);
    }

    if (msg.op === 'ocm') {
      _onOrderChangeMessage (msg);
    }
  }

  function _onConnectionMessage(msg: StreamMessageConnection) {
    connectionId = msg.connectionId;
    log.debug (`connection suceeded`, msg);
  }

  function _onSuccessMessage(msg: StreamMessageSuccess) {
    isConnectionClosed = false;
    connectionsAvailable = msg.connectionsAvailable;
    log.debug (`success message received`, msg);
  }

  function _onFailureMessage(msg: StreamMessageFailure) {
    isConnectionClosed = msg.connectionClosed;
    log.error (`failure message received`, msg);
  }

  function _onMarketChangeMessage(msg: StreamMessageMarketChange) {
    log.debug (`market change message received`, msg);
    marketsSubscription.onMarketChangeMessage (msg);
  }

  function _onOrderChangeMessage(msg: StreamMessageOrderChange) {
    log.debug (`order change message received`, msg);
  }

  function _nextId() {
    return id + 1;
  }

  function subscribeToMarkets(
    i: Omit<StreamMessageRequestMarketsSubscription, 'op'>
  ) {
    const nextId = _nextId ();
    const msg: StreamMessageRequestMarketsSubscription = {
      ...i,
      op: 'marketSubscription',
      id: nextId,
    };

    socketConnection.write (`${JSON.stringify (msg)}\r\n`);
    log.debug (`market subscription requested`, msg);
  }

  function subscribeToOrders(
    i: Omit<StreamMessageRequestOrdersSubscription, 'op'>
  ) {
    const nextId = _nextId ();
    const msg: StreamMessageRequestOrdersSubscription = {
      ...i,
      op: 'orderSubscription',
      id: nextId,
    };

    socketConnection.write (`${JSON.stringify (msg)}\r\n`);
    log.debug (`order subscription requested`, msg);
  }

  return {
    id: () => id,
    account: () => props.account,
    subscribeToMarkets,
    subscribeToOrders,
  };
};
