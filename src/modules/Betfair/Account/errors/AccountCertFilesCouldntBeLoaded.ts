export type AccountCertFilesCouldntBeLoaded = {
  __typename: 'AccountCertFilesCouldntBeLoaded';
  message: string;
  metadata: {
    certificateFilesPath: {
      certPath: string;
      keyPath: string;
    };
    childError: Error;
  };
};

export const AccountCertFilesCouldntBeLoaded = (certificateFilesPath: {
  certPath: string;
  keyPath: string;
}) => (childError: any): Promise<never> => {
  const err: AccountCertFilesCouldntBeLoaded = {
    __typename: 'AccountCertFilesCouldntBeLoaded',
    message: `Something went wrong with the certificate files that you provided.`,
    metadata: {
      certificateFilesPath,
      childError,
    },
  };

  return Promise.reject (err);
};
