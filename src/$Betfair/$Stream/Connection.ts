import { Account } from '$Betfair/$Account';
import * as $Log from '$Log';
import Logger from 'bunyan';
import tls from 'tls';

import { makeAuthentication, MessageRequest } from './MessageRequest';
import { MessageResponse } from './MessageResponse';
import * as $Guards from './MessageResponse.guard';
export class Connection {
  private _id: number;
  private _account: Account;
  private _socketConnection: tls.TLSSocket;
  private _socketEndpoint: string;
  private _socketTimeout: number;
  private _msgHandlers: ((msg: MessageResponse) => void)[] = [];
  private _socketConnectionId = '';
  private _socketBuffer = '';
  private _isConnectionClosed = true;
  private _connectionsAvailable = 0;
  private _log = $Log.log.child ({
    module: 'Betfair',
    sub: 'Connection',
  });

  constructor(i: {
    account: Account;
    socketEndpoint: 'LIVE' | 'INTEGRATION';
    socketTimeout: number;
    logLevel: Logger.LogLevel;
  }) {
    this._id = Math.floor (Math.random () * 100 + 1);
    this._account = i.account;
    this._socketTimeout = i.socketTimeout;
    this._socketEndpoint = {
      LIVE: 'stream-api.betfair.com',
      INTEGRATION: 'stream-api-integration.betfair.com',
    }[i.socketEndpoint];

    this.addHandler (this._msgHandler);

    this._socketConnection = this._startConnection ();
    this._listenMessages ();
    this._doAuthentication ();
  }

  private _startConnection() {
    const conn = tls.connect (443, this._socketEndpoint, {
      timeout: this._socketTimeout,
    });

    this._log.info ('socket connection requested');

    return conn;
  }

  private _listenMessages() {
    this._socketConnection.on ('data', (bufferData) => {
      this._log.debug ('socket raw data received', bufferData.toString ());
      this._socketBuffer += bufferData.toString ('utf8');

      const messagesToProccess = this._socketBuffer.split ('\r\n').slice (0, -1);
      const isStreamEndMessage =
        bufferData.toString ('utf8').slice (-2) === '\r\n';

      if (isStreamEndMessage) {
        for (const msg of messagesToProccess) {
          this._msgHandlers.forEach ((fn) => fn.bind (this) (JSON.parse (msg)));
        }
        this._socketBuffer = '';
      }
    });
  }

  private _doAuthentication() {
    this.sendMsg (
      makeAuthentication ({
        id: this._id,
        session: this._account.sessionToken,
        appKey: this._account.apiKey,
      })
    );

    this._log.info ('authentication requested');
  }

  private _msgHandler(msg: MessageResponse) {
    if ($Guards.isConnectionSuccess (msg)) {
      this._socketConnectionId = msg.connectionId;
      this._log.info (`connection suceeded`);
    }

    if ($Guards.isConnectionFailure (msg)) {
      this._isConnectionClosed = msg.connectionClosed;
      this._log.error (`failure message received`, msg);
    }

    if ($Guards.isAuthenticationSuccess (msg)) {
      this._connectionsAvailable = msg.connectionsAvailable;
      this._isConnectionClosed = msg.connectionClosed;
      this._log.info (`authentication suceeded`);
    }
  }

  addHandler(...i: ((msg: MessageResponse) => void)[]) {
    this._msgHandlers.push (...i);
  }

  sendMsg(i: MessageRequest) {
    this._socketConnection.write (`${JSON.stringify (i)}\r\n`);
  }
}
