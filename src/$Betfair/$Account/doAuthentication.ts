import path from 'path';
import fs from 'fs';
import https from 'https';
import fetch from 'node-fetch';

import {
  AccountCertFilesCouldntBeLoadedError,
  AccountLoginHasFailedError,
} from '$Errors';

import { Account } from './Account';

type DoAuthenticationInput = {
  username: string;
  password: string;
  apiKey: string;
  certificateFilesPath: { certPath: string; keyPath: string };
  apiJurisdication?: Account['apiJurisdication'];
};

export const doAuthentication = ({
  apiJurisdication = 'COM',
  apiKey,
  certificateFilesPath: { certPath, keyPath },
  ...i
}: DoAuthenticationInput): Promise<Account> => {
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
        username: i.username || '',
        password: i.password || '',
      }).toString (),
      agent: httpsAgent,
      headers: {
        'X-Application': apiKey || '',
        'Content-Type': ' application/x-www-form-urlencoded',
      },
    })
      .then ((res) => res.json ())
      .then (validateSessionOrFail)
      .catch (AccountLoginHasFailedError ({ ...i, apiKey }))
  );

  const validateSessionOrFail = (res: any): Promise<{ sessionToken: string }> =>
    res?.loginStatus === 'SUCCESS' && res?.sessionToken
      ? Promise.resolve (res)
      : Promise.reject ();

  return apiRequest.then (({ sessionToken }) => ({
    sessionToken,
    apiJurisdication,
    apiKey,
  }));
};
