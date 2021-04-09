export type APINGExceptionHasOcurredError = {
  __typename: 'APINGExceptionHasOcurredError';
  message: string;
  metadata: {
    childError: Error;
  };
};

export const APINGExceptionHasOcurredError = (
  childError: any
): Promise<never> => {
  const err: APINGExceptionHasOcurredError = {
    __typename: 'APINGExceptionHasOcurredError',
    message: `An error was returned from the Betfair Account API.`,
    metadata: {
      childError,
    },
  };

  return Promise.reject (err);
};
