export type AccountLoginHasFailed = {
  __typename: 'AccountLoginHasFailed';
  message: string;
  metadata: {
    username: string;
    password: string;
    apiKey: string;
  };
  childError: Error | unknown;
};

export const AccountLoginHasFailed = (
  metadata: AccountLoginHasFailed['metadata']
) => (childError: Error | unknown): Promise<never> => {
  const err: AccountLoginHasFailed = {
    __typename: 'AccountLoginHasFailed',
    message: `Something went wrong when we tried to call Betfair Login API. Please check if the provided credentials are correct.`,
    metadata,
    childError,
  };

  return Promise.reject (err);
};
