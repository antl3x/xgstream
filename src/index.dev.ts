/**
 * THIS FILE IS USED ONLY FOR DEVELOPMENT PURPOSES AND IS
 * NOT PART OF THE PACKAGE DISTRIBUTION.
 */

import * as $Account from '$Betfair/$Account';
import * as $Stream from '$Betfair/$Stream';
import dotenv from 'dotenv';
import path from 'path';

async function init() {
  dotenv.config ({ path: path.resolve (process.cwd (), '.secrets/.env') });

  const betfairAccount = await $Account.doAuthentication ({
    username: process.env.BETFAIR_USERNAME || '',
    password: process.env.BETFAIR_PASSWORD || '',
    apiKey: process.env.BETFAIR_API_KEY || '',
    certificateFilesPath: {
      keyPath: '.secrets/betfair.key',
      certPath: '.secrets/betfair.crt',
    },
  });

  const streamConnection = $Stream.$Connection.createConnection ({
    account: betfairAccount,
    endpoint: 'LIVE',
    logLevel: 'info',
  });

  const marketSub = $Stream.$MarketsSubscription.createMarketsSubscription ({
    streamConnection,
    marketDataFilter: {
      fields: [],
      ladderLevels: 10,
    },
    marketFilter: {
      eventTypeIds: ['7'],
      marketTypes: ['WIN'],
    },
    customHandlers: {
      beforeRunnerTrdChange: (i) => {
        console.log (i.msg.trd);
      },
    },
  });
}

process.on ('unhandledRejection', (up) => {
  throw up;
});

init ();
