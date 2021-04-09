import { Account } from '$Betfair/$Account';
import Logger from 'bunyan';
import { Connection } from './Connection';

type ConnectionInput = {
  id?: number;
  account: Account;
  socketEndpoint?: 'LIVE' | 'INTEGRATION';
  socketTimeout?: number;
  logLevel?: Logger.LogLevel;
};

export const createConnection = (i: ConnectionInput): Connection => {
  return new Connection ({
    account: i.account,
    logLevel: i.logLevel || 'info',
    socketEndpoint: i.socketEndpoint || 'INTEGRATION',
    socketTimeout: i.socketTimeout || 0,
  });
};