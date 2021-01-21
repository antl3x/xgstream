export type AccountCertFilesCouldntBeLoadedError = {
  __typename: 'AccountCertFilesCouldntBeLoadedError';
  message: string;
  metadata: {
    certificateFilesPath: {
      certPath: string;
      keyPath: string;
    };
    childError: Error;
  };
};

export const AccountCertFilesCouldntBeLoadedError = (certificateFilesPath: {
  certPath: string;
  keyPath: string;
}) => (childError: any): Promise<never> => {
  const err: AccountCertFilesCouldntBeLoadedError = {
    __typename: 'AccountCertFilesCouldntBeLoadedError',
    message: `Something went wrong with the certificate files that you provided.`,
    metadata: {
      certificateFilesPath,
      childError,
    },
  };

  return Promise.reject (err);
};
