/* -------------------------------------------------------------------------- */
/*                              MESSAGE REQUESTS                              */
/* -------------------------------------------------------------------------- */

export type AUTHENTICATION_REQUEST = {
  op: 'authentication';
  id: number;
  appKey: string;
  session: string;
};

export const AUTHENTICATION_REQUEST = (
  i: Omit<AUTHENTICATION_REQUEST, 'op'>
): AUTHENTICATION_REQUEST => ({
  op: 'authentication',
  ...i,
});

export type Requests = AUTHENTICATION_REQUEST;

/* -------------------------------------------------------------------------- */
/*                              MESSAGE RESPONSES                             */
/* -------------------------------------------------------------------------- */

/**
 * @see {isConnectionSuccess} ts-auto-guard:type-guard
 */
export type CONNECTION_SUCCESS_RESPONSE = {
  op: 'connection';
  connectionId: string;
};

/**
 * @see {isConnectionFailure} ts-auto-guard:type-guard
 */
export type CONNECTION_FAILURE_RESPONSE = {
  op: 'status';
  statusCode: 'FAILURE';
  connectionId: string;
  connectionClosed: true;
  errorMessage: string;
  errorCode:
    | 'INVALID_INPUT'
    | 'TIMEOUT'
    | 'NO_APP_KEY'
    | 'INVALID_APP_KEY'
    | 'NO_SESSION'
    | 'INVALID_SESSION_INFORMATION'
    | 'NOT_AUTHORIZED'
    | 'MAX_CONNECTION_LIMIT_EXCEEDED'
    | 'TOO_MANY_REQUESTS'
    | 'SUBSCRIPTION_LIMIT_EXCEEDED'
    | 'INVALID_CLOCK'
    | 'UNEXPECTED_ERROR'
    | 'CONNECTION_FAILED';
};

/**
 * @see {isAuthenticationSuccess} ts-auto-guard:type-guard
 */
export type AUTHENTICATION_SUCCESS_RESPONSE = {
  op: 'status';
  id: number;
  statusCode: 'SUCCESS';
  connectionClosed: false;
  connectionsAvailable: number;
};

export type Responses =
  | CONNECTION_SUCCESS_RESPONSE
  | CONNECTION_FAILURE_RESPONSE
  | AUTHENTICATION_SUCCESS_RESPONSE;
