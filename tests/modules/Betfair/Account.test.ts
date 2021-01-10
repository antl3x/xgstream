import { createAccount } from '@modules/Betfair/Account/Account';

it ('Should pass with valid account credentials', async () => {
  const betfairAccount = await createAccount ({
    username: process.env.BETFAIR_USERNAME || '',
    password: process.env.BETFAIR_PASSWORD || '',
    apiKey: process.env.BETFAIR_API_KEY || '',
    certificateFilesPath: {
      keyPath: '../../../../.secrets/betfair.key',
      certPath: '../../../../.secrets/betfair.crt',
    },
  });
  expect (betfairAccount.sessionToken).toBeTruthy ();
});
