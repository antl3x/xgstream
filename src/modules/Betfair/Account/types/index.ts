export type { ApiOperations };

type ApiOperations = {
  getAccountFunds: {
    parameter: GetAccountFundsParameter;
    response: GetAccountFundsResponse;
  };
};

type GetAccountFundsParameter = {
  wallet: Wallet;
};

export type GetAccountFundsResponse = {
  availableToBetBalance: number;
  exposure: number;
  retainedCommission: number;
  exposureLimit: number;
  pointsBalance: number;
  wallet: Wallet;
  discountRate: number;
};

///////////////////////
// Common Api Types //
/////////////////////

type Wallet = 'UK';
