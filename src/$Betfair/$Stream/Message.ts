import * as $Guards from './Message.GENERATED_GUARDS';
import { MarketDefinition } from './Market';

export type Message = any;

export type MessageResponse =
  | ResponseConnectionSuccess
  | ResponseConnectionFailure
  | ResponseMarketSubscriptionSuccess;

export type MessageRequest = RequestAuthentication | RequestMarketSubscription;

/**
 * @see {isResponseConnectionSuccess} ts-auto-guard:type-guard
 */
export type ResponseConnectionSuccess = {
  op: 'connection';
  connectionId: string;
};

/**
 * @see {isResponseConnectionFailure} ts-auto-guard:type-guard
 */
export type ResponseConnectionFailure = {
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
 * @see {isResponseMarketSubscriptionSuccess} ts-auto-guard:type-guard
 */
export type ResponseMarketSubscriptionSuccess = {
  op: 'mcm';
  id: number;
  clk: string;
  conflateMs: number;
  heartbeatMs: number;
  pt: number;
  ct: 'SUB_IMAGE' | 'RESUB_DELTA';
  // mc?: {
  //   id: string;
  //   img: boolean;
  //   tv?: number;
  //   marketDefinition?: MarketDefinition;
  //   rc: RunnerChange[];
  // }[];
};

export type RequestAuthentication = {
  op: 'authentication';
  id: number;
  appKey: string;
  session: string;
};

export const makeRequestAuthentication = (
  i: Omit<RequestAuthentication, 'op'>
): RequestAuthentication => ({
  op: 'authentication',
  ...i,
});

export type RequestMarketSubscription = {
  op: 'marketSubscription';
  id: number;
  segmentationEnabled?: boolean;
  conflateMs?: number;
  heartbeatMs?: number;
  initialClk?: string;
  clk?: string;
  marketFilter: {
    marketIds?: string[];
    bspMarket?: boolean;
    bettingTypes?: string[];
    eventTypeIds?: string[];
    eventIds?: string[];
    turnInPlayEnabled?: boolean;
    marketTypes?: string[];
    venues?: string[];
    countryCodes?: string[];
    raceTypes?: string[];
  };
  marketDataFilter: {
    fields: (
      | 'EX_BEST_OFFERS_DISP'
      | 'EX_BEST_OFFERS'
      | 'EX_ALL_OFFERS'
      | 'EX_TRADED'
      | 'EX_TRADED_VOL'
      | 'EX_LTP'
      | 'EX_MARKET_DEF'
      | 'SP_TRADED'
      | 'SP_PROJECTED'
    )[];
    ladderLevels: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  };
};

export { $Guards };

// export type Message =
//   | MessageFailure
//   | MessageSuccess
//   | MessageConnection
//   | MessageMarketChange
//   | MessageOrderChange;

// export type MessageConnection = {
//   op: 'connection';
//   connectionId: string;
// };

// export type MessageFailure = {

// };

// export type MessageSuccess = {
//   op: 'status';
//   id: number;
//   statusCode: 'SUCCESS';
//   connectionClosed: boolean;
//   connectionsAvailable: number;
// };

// export type MessageRequest =
//   | MessageRequestMarketsSubscription
//   | MessageRequestOrdersSubscription;

// export type MessageRequestSubscription = {
//   id?: number;
//   segmentationEnabled?: boolean;
//   conflateMs?: number;
//   heartbeatMs?: number;
//   initialClk?: string;
//   clk?: string;
// };

// export type MessageRequestMarketsSubscription = MessageRequestSubscription & {
//   op: 'marketSubscription';
//   marketFilter: MarketFilter;
//   marketDataFilter: MarketDataFilter;
// };

// export type MessageRequestOrdersSubscription = MessageRequestSubscription & {
//   op: 'orderSubscription';
//   orderFilter?: OrderFilter;
// };

// export type MessageChange = {
//   id: number;
//   ct?: 'SUB_IMAGE' | 'RESUB_DELTA' | 'HEARTBEAT';
//   segmentType?: 'SEG_START' | 'SEG' | 'SEG_END';
//   status?: '503';
//   conflateMs?: number;
//   heartbeatMs: number;
//   pt: number;
//   initialClk: string;
//   clk: string;
// };

// export type MessageMarketChange = MessageChange & {
//   op: 'mcm';
//   mc: {
//     id: string;
//     img?: boolean;
//     tv?: number;
//     marketDefinition?: MarketDefinition;
//     rc: RunnerChange[];
//   }[];
// };

// export type MessageOrderChange = MessageChange & {
//   op: 'ocm';
// };

export type RunnerChange = {
  id: number;
  con?: boolean;
  tv?: number;
  ltp?: number;
  spn?: number;
  spf?: number;
  batb?: [number, number, number][];
  batl?: [number, number, number][];
  bdatb?: [number, number, number][];
  bdatl?: [number, number, number][];
  atb?: [number, number][];
  atl?: [number, number][];
  spb?: [number, number][];
  spl?: [number, number][];
  trd?: [number, number][];
};

// export type OrderFilter = {
//   includeOverallPosition?: boolean;
//   customerStrategyRefs?: string[];
//   partitionMatchedByStrategyRef?: boolean;
// };

/**
 * Type Guards
 */

// const isSubscriptionRequestSuccess = (i: Message): i is Mess =>
