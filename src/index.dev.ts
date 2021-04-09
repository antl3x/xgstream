/**
 * THIS FILE IS USED ONLY FOR DEVELOPMENT PURPOSES AND IS
 * NOT PART OF THE PACKAGE DISTRIBUTION.
 */

import dotenv from 'dotenv';
import path from 'path';

import * as $Account from '$Betfair/$Account';
import { createConnection, createMarketsSubscription } from '$Betfair/$Stream';

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

  const streamConnection = createConnection ({
    account: betfairAccount,
    socketEndpoint: 'LIVE',
    logLevel: 'info',
  });

  createMarketsSubscription ({
    streamConnection,
    marketDataFilter: {
      fields: ['EX_ALL_OFFERS'],
      ladderLevels: 10,
    },
    marketFilter: {
      marketIds: ['1.180960241'],
    },
  });

  // streamConnection.subscribeToMarkets ({
  //   marketFilter: {
  //     marketIds: ['1.178239869'],
  //   },
  //   marketDataFilter: {
  //     fields: [
  //       'EX_ALL_OFFERS',
  //       'EX_BEST_OFFERS',
  //       'EX_BEST_OFFERS_DISP',
  //       'EX_LTP',
  //       'EX_TRADED',
  //       'EX_TRADED_VOL',
  //       'SP_PROJECTED',
  //       'SP_TRADED',
  //       'EX_MARKET_DEF',
  //     ],
  //     ladderLevels: 10,
  //   },
  // });

  // streamConnection.subscribeToMarkets ({
  //   marketFilter: {
  //     eventTypeIds: ['7'],
  //   },
  //   marketDataFilter: {
  //     fields: [
  //       'EX_BEST_OFFERS_DISP',
  //       'EX_BEST_OFFERS',
  //       'EX_ALL_OFFERS',
  //       'EX_MARKET_DEF',
  //       'EX_TRADED',
  //       'EX_TRADED_VOL',
  //       'EX_LTP',
  //       'SP_PROJECTED',
  //     ],
  //     ladderLevels: 10,
  //   },
  // });
}

process.on ('unhandledRejection', (up) => {
  throw up;
});

init ();
