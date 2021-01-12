import path from 'path';
import fs from 'fs';
import https from 'https';
import fetch from 'node-fetch';
import {
  Account,
  createAccount,
  AccountCertFilesCouldntBeLoaded,
  AccountLoginHasFailed,
  ApiJurisdictions,
} from '@modules/Betfair/Account';

type CreateAccountSessionProps = {
  username: string;
  password: string;
  apiKey: string;
  certificateFilesPath: { certPath: string; keyPath: string };
  apiJurisdication?: ApiJurisdictions;
};

type CreateAccountSession = (
  props: CreateAccountSessionProps
) => Promise<Account>;

export const createAccountSession: CreateAccountSession = (props) => {
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
    AccountCertFilesCouldntBeLoaded ({ certPath, keyPath })
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
      .catch (AccountLoginHasFailed (props))
  );

  return apiRequest.then (({ sessionToken }) =>
    createAccount ({ sessionToken, apiJurisdication, apiKey })
  );
};

const validateSessionOrFail = (res: any): Promise<{ sessionToken: string }> =>
  res?.loginStatus === 'SUCCESS' && res?.sessionToken
    ? Promise.resolve (res)
    : Promise.reject ();
