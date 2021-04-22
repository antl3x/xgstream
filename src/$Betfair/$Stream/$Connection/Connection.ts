import Logger from 'bunyan';
import tls from 'tls';

import * as $Log from '$Log';
import { Account } from '$Betfair/$Account';

import { AUTHENTICATION_REQUEST, Requests, Responses } from './Messages';
import * as $Guards from './Messages.guard';

export class Connection {
  private _id: number;
  private _account: Account;
  private _endpoint: string;
  private _timeout: number;
  private _onMessages: ((msg: Responses) => void)[] = [];
  private _socketBuffer = '';
  private _isConnectionClosed = true;
  private _connectionsAvailable = 0;
  public connId = '';
  public conn: tls.TLSSocket;

  constructor(i: {
    account: Account;
    endpoint: 'LIVE' | 'INTEGRATION';
    timeout: number;
    logLevel: Logger.LogLevel;
  }) {
    this._id = Math.floor (Math.random () * 100 + 1);
    this._account = i.account;
    this._timeout = i.timeout;
    this._endpoint = {
      LIVE: 'stream-api.betfair.com',
      INTEGRATION: 'stream-api-integration.betfair.com',
    }[i.endpoint];

    this.addHandler (this._onMessage.bind (this));

    this.conn = this._doConnection ();
    this._listenMessages ();
    this._doAuthentication ();
  }

  private _doConnection() {
    const conn = tls.connect (443, this._endpoint, {
      timeout: this._timeout,
    });

    log.info ('socket connection requested');

    return conn;
  }

  private _listenMessages() {
    this.conn.on ('data', (bufferData) => {
      log.debug ('socket raw data received', bufferData.toString ());
      this._socketBuffer += bufferData.toString ('utf8');

      const messagesToProccess = this._socketBuffer.split ('\r\n').slice (0, -1);
      const isStreamEndMessage =
        bufferData.toString ('utf8').slice (-2) === '\r\n';

      if (isStreamEndMessage) {
        for (const msg of messagesToProccess) {
          this._onMessages.forEach ((fn) => fn (JSON.parse (msg)));
        }
        this._socketBuffer = '';
      }
    });
  }

  private _doAuthentication() {
    this.conn.write (
      `${JSON.stringify (
        AUTHENTICATION_REQUEST ({
          id: this._id,
          session: this._account.sessionToken,
          appKey: this._account.apiKey,
        })
      )}\r\n`
    );

    log.info ('authentication requested');
  }

  private _onMessage(msg: Responses) {
    if ($Guards.isConnectionSuccess (msg)) {
      this.connId = msg.connectionId;
      log.info (`connection suceeded`);
    }

    if ($Guards.isConnectionFailure (msg)) {
      this._isConnectionClosed = msg.connectionClosed;
      log.error (`failure message received`, msg);
    }

    if ($Guards.isAuthenticationSuccess (msg)) {
      this._connectionsAvailable = msg.connectionsAvailable;
      this._isConnectionClosed = msg.connectionClosed;
      log.info (`authentication suceeded`);
    }
  }

  addHandler(...i: ((msg: any) => void)[]) {
    this._onMessages.push (...i);
  }
}

/* -------------------------------------------------------------------------- */
/*                               SIDE FUNCTIONS                               */
/* -------------------------------------------------------------------------- */

const log = $Log.log.child ({
  module: 'Betfair',
  sub: 'Connection',
});
