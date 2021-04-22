import Logger from 'bunyan';

import { Account } from '$Betfair/$Account';
import * as $Log from '$Log';

import { Connection } from './Connection';

type ConnectionInput = {
  id?: number;
  account: Account;
  endpoint?: 'LIVE' | 'INTEGRATION';
  timeout?: number;
  logLevel?: Logger.LogLevel;
};

export const createConnection = (i: ConnectionInput): Connection => {
  if (i.logLevel) $Log.log.level (i.logLevel);
  return new Connection ({
    account: i.account,
    logLevel: i.logLevel || 'info',
    endpoint: i.endpoint || 'INTEGRATION',
    timeout: i.timeout || 0,
  });
};
