import { ApiJurisdictions } from './@types';

type CreateAccountProps = {
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

export const createAccount = (props: CreateAccountProps): Account => ({
  __typename: 'Betfair_Account',
  apiKey: props.apiKey,
  sessionToken: props.sessionToken,
  apiJurisdication: props.apiJurisdication,
});
