import { Account, Wallet } from './Account';
import fetch from 'node-fetch';

type GetAccountFundsInput = {
  account: Account;
  apiEndpoint?: string;
};

type GetAccountFundsResponse = {
  availableToBetBalance: number;
  exposure: number;
  retainedCommission: number;
  exposureLimit: number;
  pointsBalance: number;
  wallet: Wallet;
  discountRate: number;
};

type GetAccountFunds = (
  i: GetAccountFundsInput
) => Promise<GetAccountFundsResponse>;

export const getAccountFunds: GetAccountFunds = (i) => {
  const {
    account,
    apiEndpoint = 'https://api.betfair.com/exchange/account/rest/v1.0',
  } = i;

  const apiRequest = fetch (apiEndpoint + '/getAccountFunds/', {
    body: JSON.stringify ({ wallet: 'UK' }),
    method: 'POST',
    headers: {
      'X-Application': account.apiKey,
      'X-Authentication': account.sessionToken,
      'Content-Type': 'application/json',
    },
  });

  return apiRequest.then ((res) => res.json ());
};
