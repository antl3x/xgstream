import fs from 'fs';
import https from 'https';
import fetch from 'node-fetch';
import path from 'path';
import { AccountCertFilesCouldntBeLoaded } from './errors/AccountCertFilesCouldntBeLoaded';
import { AccountLoginHasFailed } from './errors/AccountLoginHasFailed';
import { ApiOperations, GetAccountFundsResponse } from './types';

type AccountProps = {
  username: string;
  password: string;
  apiKey: string;
  certificateFilesPath: { certPath: string; keyPath: string };
};

export interface Account {
  apiKey: () => string;
  sessionToken: () => string;
  accountFunds: (i?: { wallet: 'UK' }) => Promise<GetAccountFundsResponse>;
}

export const createAccount = (props: AccountProps): Promise<Account> => {
  const _apiUrl = 'https://api.betfair.com/exchange/account/rest/v1.0';
  let sessionToken = '';

  function _init() {
    const CERT_FILE = path.join (__dirname, props.certificateFilesPath.certPath);
    const KEY_FILE = path.join (__dirname, props.certificateFilesPath.keyPath);

    const certFile = fs.promises.readFile (CERT_FILE);
    const keyFile = fs.promises.readFile (KEY_FILE);

    const readFiles = Promise.all ([certFile, keyFile]).catch (
      AccountCertFilesCouldntBeLoaded (props.certificateFilesPath)
    );

    const httpsAgent = readFiles.then (
      ([certFile, keyFile]) => new https.Agent ({ cert: certFile, key: keyFile })
    );

    const apiRequest = httpsAgent
      .then ((httpsAgent) =>
        fetch ('https://identitysso-cert.betfair.com/api/certlogin', {
          method: 'POST',
          body: new URLSearchParams ({
            username: props.username || '',
            password: props.password || '',
          }).toString (),
          agent: httpsAgent,
          headers: {
            'X-Application': props.apiKey || '',
            'Content-Type': ' application/x-www-form-urlencoded',
          },
        }).then ((x) => x.json () as Promise<{ sessionToken: string }>)
      )
      .catch (AccountLoginHasFailed (props));

    return apiRequest.then (({ sessionToken: sToken }) => {
      sessionToken = sToken;
      return this;
    });
  }

  const accountFunds = async (
    { wallet = 'UK' } = { wallet: 'UK' as const }
  ) => {
    const apiRequest = await fetch (_apiUrl + '/getAccountFunds/', {
      body: JSON.stringify ({ wallet }),
      method: 'POST',
      headers: {
        'X-Application': props.apiKey,
        'X-Authentication': sessionToken,
        'Content-Type': 'application/json',
      },
    });

    return apiRequest.json () as Promise<
      ApiOperations['getAccountFunds']['response']
    >;
  };

  return _init ().then (() => ({
    apiKey: () => props.apiKey,
    sessionToken: () => sessionToken,
    accountFunds,
  }));
};
