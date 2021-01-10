import { createAccount } from '@modules/Betfair/Account/Account';
import { StreamConnection } from '@modules/Betfair/Stream/ConnectionStream';

it ('Should pass with valid account credentials', async (done) => {
  const betfairAccount = await createAccount ({
    username: process.env.BETFAIR_USERNAME || '',
    password: process.env.BETFAIR_PASSWORD || '',
    apiKey: process.env.BETFAIR_API_KEY || '',
    certificateFilesPath: {
      keyPath: '../../../../.secrets/betfair.key',
      certPath: '../../../../.secrets/betfair.crt',
    },
  });

  const streamConnection = StreamConnection ({ account: betfairAccount });

  const marketSubscription = streamConnection.subscribeToMarkets ({
    marketFilter: {
      marketIds: ['1.177683256'],
    },
    marketDataFilter: {
      fields: [
        'EX_BEST_OFFERS_DISP',
        'EX_BEST_OFFERS',
        'EX_ALL_OFFERS',
        'EX_MARKET_DEF',
        'EX_TRADED',
        'EX_TRADED_VOL',
        'EX_LTP',
        'SP_PROJECTED',
      ],
      ladderLevels: 10,
    },
  });
  expect (betfairAccount.sessionToken).toBeTruthy ();
  setTimeout (() => {
    done ();
    Promise.resolve ();
  }, 10000);
});
