export type AccountLoginHasFailedError = {
  __typename: 'AccountLoginHasFailedError';
  message: string;
  metadata: {
    username: string;
    password: string;
    apiKey: string;
  };
  childError: Error | unknown;
};

export const AccountLoginHasFailedError = (
  metadata: AccountLoginHasFailedError['metadata']
) => (childError: Error | unknown): Promise<never> => {
  const err: AccountLoginHasFailedError = {
    __typename: 'AccountLoginHasFailedError',
    message: `Something went wrong when we tried to call Betfair Login API. Please check if the provided credentials are correct.`,
    metadata,
    childError,
  };

  return Promise.reject (err);
};
