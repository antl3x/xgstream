import path from 'path';
import fs from 'fs';
import https from 'https';
import fetch from 'node-fetch';
import {
  AccountCertFilesCouldntBeLoadedError,
  AccountLoginHasFailedError,
} from '@private/BetfairAccount';

type ApiJurisdictions = 'COM' | 'IT' | 'ES' | 'RO' | 'SE';

type AccountDto = {
  sessionToken: string;
  apiKey: string;
  apiJurisdication: ApiJurisdictions;
};
export interface Account {
  __typename: 'Betfair_Account';
  apiKey: string;
  sessionToken: string;
  apiJurisdication: ApiJurisdictions;
}

const toDomain = (props: AccountDto): Account => ({
  __typename: 'Betfair_Account',
  apiKey: props.apiKey,
  sessionToken: props.sessionToken,
  apiJurisdication: props.apiJurisdication,
});

const toDto = (props: Account): AccountDto => ({
  apiKey: props.apiKey,
  sessionToken: props.sessionToken,
  apiJurisdication: props.apiJurisdication,
});

type CreateAccountProps = {
  username: string;
  password: string;
  apiKey: string;
  certificateFilesPath: { certPath: string; keyPath: string };
  apiJurisdication?: ApiJurisdictions;
};

export const createAccount = (props: CreateAccountProps): Promise<Account> => {
  const {
    apiJurisdication = 'COM',
    apiKey,
    certificateFilesPath: { certPath, keyPath },
  } = props;

  const API_ENDPOINT = `https://identitysso-cert.betfair.${apiJurisdication}/api/certlogin`;
  const CERT_FILE = path.resolve (process.cwd (), certPath);
  const KEY_FILE = path.resolve (process.cwd (), keyPath);

  const certFile = fs.promises.readFile (CERT_FILE);
  const keyFile = fs.promises.readFile (KEY_FILE);

  const readFiles = Promise.all ([certFile, keyFile]).catch (
    AccountCertFilesCouldntBeLoadedError ({ certPath, keyPath })
  );

  const httpsAgent = readFiles.then (
    ([cert, key]) => new https.Agent ({ cert, key })
  );

  const apiRequest = httpsAgent.then ((httpsAgent) =>
    fetch (API_ENDPOINT, {
      method: 'POST',
      body: new URLSearchParams ({
        username: props.username || '',
        password: props.password || '',
      }).toString (),
      agent: httpsAgent,
      headers: {
        'X-Application': apiKey || '',
        'Content-Type': ' application/x-www-form-urlencoded',
      },
    })
      .then ((res) => res.json ())
      .then (validateSessionOrFail)
      .catch (AccountLoginHasFailedError (props))
  );

  return apiRequest.then (({ sessionToken }) =>
    toDomain ({ sessionToken, apiJurisdication, apiKey })
  );
};

const validateSessionOrFail = (res: any): Promise<{ sessionToken: string }> =>
  res?.loginStatus === 'SUCCESS' && res?.sessionToken
    ? Promise.resolve (res)
    : Promise.reject ();
