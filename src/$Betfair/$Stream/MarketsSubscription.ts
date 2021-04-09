import * as $Log from '$Log';
import { Connection } from './Connection';
import { Message } from './Message';

export class MarketsSubscription {
  private _id: number;
  private _initialClk: string;
  private _clk: string;
  private _conflateMs: number;
  private _heartbeatMs: number;
  private _messagesReceived: number;
  private _lastPublishTime: number;
  private _connection: Connection;
  private _log = $Log.logChild ({
    module: 'Betfair',
    sub: 'MarketsSubscriptions',
  });

  constructor(i: {
    id: number;
    initialClk: string;
    clk: string;
    conflateMs: number;
    heartbeatMs: number;
    lastPublishedTime: number;
    connection: Connection;
  }) {
    this._id = i.id;
    this._initialClk = i.initialClk;
    this._clk = i.clk;
    this._conflateMs = i.conflateMs;
    this._heartbeatMs = i.heartbeatMs;
    this._lastPublishTime = i.lastPublishedTime;
    this._messagesReceived = 1;
    this._connection = i.connection;

    this._connection.addHandler (this._onSubMessage);
  }

  private _onSubMessage(msg: Message) {
    if (msg.op === 'mcm' && msg.id === this._id && msg.ct === 'SUB_IMAGE') {
      this._log.debug ('market subscription sub_image received');
    }
  }
}
