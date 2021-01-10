export type APINGExceptionHasOcurred = {
  __typename: 'APINGExceptionHasOcurred';
  message: string;
  metadata: {
    childError: Error;
  };
};

export const APINGExceptionHasOcurred = (childError: any): Promise<never> => {
  const err: APINGExceptionHasOcurred = {
    __typename: 'APINGExceptionHasOcurred',
    message: `An error was returned from the Betfair Account API.`,
    metadata: {
      childError,
    },
  };

  return Promise.reject (err);
};
