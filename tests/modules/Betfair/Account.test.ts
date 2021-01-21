import { doAuthentication, getAccountFunds } from '@module/BetfairAccount';

it ('Should pass with valid account credentials', async () => {
  const betfairAccount = await doAuthentication ({
    username: process.env.BETFAIR_USERNAME || '',
    password: process.env.BETFAIR_PASSWORD || '',
    apiKey: process.env.BETFAIR_API_KEY || '',
    certificateFilesPath: {
      keyPath: '.secrets/betfair.key',
      certPath: '.secrets/betfair.crt',
    },
  });
  expect (betfairAccount.sessionToken).toBeTruthy ();
});

it ('Should pass with valid account credentials', async () => {
  const betfairAccount = await doAuthentication ({
    username: process.env.BETFAIR_USERNAME || '',
    password: process.env.BETFAIR_PASSWORD || '',
    apiKey: process.env.BETFAIR_API_KEY || '',
    certificateFilesPath: {
      keyPath: '.secrets/betfair.key',
      certPath: '.secrets/betfair.crt',
    },
  });

  const accountFunds = await getAccountFunds ({
    account: betfairAccount,
  });

  console.log (accountFunds);
  expect (accountFunds).toBeTruthy ();
});
