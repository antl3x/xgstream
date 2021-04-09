export type MessageResponse =
  | ConnectionSuccess
  | ConnectionFailure
  | AuthenticationSuccess
  | MarketSubImage
  | MarketReSubImage
  | MarketHeartbeat
  | MarketTvChange
  | MarketDefinitionChange
  | MarketLatency
  | RunnerAtbChange
  | RunnerAtlChange
  | RunnerBatbChange
  | RunnerBatlChange
  | RunnerBdatbChange
  | RunnerBdatlChange
  | RunnerTrdChange
  | RunnerTvChange
  | RunnerLtpChange
  | RunnerSplChange
  | RunnerSpbChange
  | RunnerSpnChange
  | RunnerSpfChange;

//////////////////////////
// Micro Message Types //
////////////////////////

/**
 * @see {isConnectionSuccess} ts-auto-guard:type-guard
 */
export type ConnectionSuccess = {
  op: 'connection';
  connectionId: string;
};

/**
 * @see {isConnectionFailure} ts-auto-guard:type-guard
 */
export type ConnectionFailure = {
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
export type AuthenticationSuccess = {
  op: 'status';
  id: number;
  statusCode: 'SUCCESS';
  connectionClosed: false;
  connectionsAvailable: number;
};

/**
 * @see {isMarketHeartbeat} ts-auto-guard:type-guard
 */
export type MarketHeartbeat = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  ct: 'HEARTBEAT';
};

/**
 * @see {isMarketLatency} ts-auto-guard:type-guard
 */
export type MarketLatency = {
  op: 'mcm';
  status: 503;
};

/**
 * @see {isMarketSubImage} ts-auto-guard:type-guard
 */
export type MarketSubImage = {
  op: 'mcm';
  id: number;
  initialClk: string;
  clk: string;
  conflateMs: number;
  heartbeatMs: number;
  pt: number;
  ct: 'SUB_IMAGE';
};

/**
 * @see {isMarketReSubImage} ts-auto-guard:type-guard
 */
export type MarketReSubImage = {
  op: 'mcm';
  id: number;
  initialClk: string;
  clk: string;
  conflateMs: number;
  heartbeatMs: number;
  pt: number;
  ct: 'RESUB_DELTA';
};

/**
 * @see {isRunnerAtbChange} ts-auto-guard:type-guard
 */
export type RunnerAtbChange = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  mc: { id: string; rc: { atb: [number, number][] }[] }[];
};

/**
 * @see {isRunnerAtlChange} ts-auto-guard:type-guard
 */
export type RunnerAtlChange = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  mc: { id: string; rc: { atl: [number, number][] }[] }[];
};

/**
 * @see {isRunnerBatbChange} ts-auto-guard:type-guard
 */
export type RunnerBatbChange = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  mc: { id: string; rc: { batb: [number, number][] }[] }[];
};

/**
 * @see {isRunnerBatlChange} ts-auto-guard:type-guard
 */
export type RunnerBatlChange = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  mc: { id: string; rc: { batl: [number, number][] }[] }[];
};

/**
 * @see {isRunnerBdatbChange} ts-auto-guard:type-guard
 */
export type RunnerBdatbChange = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  mc: { id: string; rc: { bdatb: [number, number][] }[] }[];
};

/**
 * @see {isRunnerBdatlChange} ts-auto-guard:type-guard
 */
export type RunnerBdatlChange = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  mc: { id: string; rc: { bdatl: [number, number][] }[] }[];
};

/**
 * @see {isRunnerTrdChange} ts-auto-guard:type-guard
 */
export type RunnerTrdChange = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  mc: { id: string; rc: { trd: [number, number][] }[] }[];
};

/**
 * @see {isRunnerTvChange} ts-auto-guard:type-guard
 */
export type RunnerTvChange = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  mc: { id: string; rc: { tv: number }[] }[];
};

/**
 * @see {isRunnerLtpChange} ts-auto-guard:type-guard
 */
export type RunnerLtpChange = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  mc: { id: string; rc: { ltp: number }[] }[];
};

/**
 * @see {isRunnerSpbChange} ts-auto-guard:type-guard
 */
export type RunnerSpbChange = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  mc: { id: string; rc: { spb: [number, number][] }[] }[];
};

/**
 * @see {isRunnerSplChange} ts-auto-guard:type-guard
 */
export type RunnerSplChange = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  mc: { id: string; rc: { spl: [number, number][] }[] }[];
};

/**
 * @see {isRunnerSpnChange} ts-auto-guard:type-guard
 */
export type RunnerSpnChange = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  mc: { id: string; rc: { spn: number }[] }[];
};

/**
 * @see {isRunnerSpfChange} ts-auto-guard:type-guard
 */
export type RunnerSpfChange = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  mc: { id: string; rc: { spf: number }[] }[];
};

/**
 * @see {isMarketTvChange} ts-auto-guard:type-guard
 */
export type MarketTvChange = {
  id: string;
  tv: number;
};

/**
 * @see {isMarketDefinitionChange} ts-auto-guard:type-guard
 */
export type MarketDefinitionChange = {
  id: string;
  marketDefinition: {
    bspMarket: boolean;
    turnInPlayEnabled: boolean;
    persistenceEnabled: boolean;
    marketBaseRate: number;
    eventId: string;
    eventTypeId: string;
    numberOfWinners: number;
    bettingType: string;
    marketType: string;
    marketTime: string;
    suspendTime: string;
    bspReconciled: boolean;
    complete: boolean;
    inPlay: boolean;
    crossMatching: boolean;
    runnersVoidable: boolean;
    numberOfActiveRunners: number;
    betDelay: number;
    status: 'OPEN' | 'INACTIVE' | 'SUSPENDED' | 'CLOSED';
    runners: {
      status:
        | 'ACTIVE'
        | 'WINNER'
        | 'LOSER'
        | 'PLACED'
        | 'REMOVED_VACANT'
        | 'REMOVED'
        | 'HIDDEN';
      adjustmentFactor?: number;
      sortPriority: number;
      removalDate?: string;
      id: number;
    }[];
    regulators: string[];
    countryCode: string;
    venue?: string;
    discountAllowed: boolean;
    timezone: string;
    openDate: string;
    version: number;
    raceType?: 'Flat';
    priceLadderDefinition: {
      type: 'CLASSIC' | 'FINEST' | 'LINE_RANGE';
    };
  };
};

/**
 * @see {isMarketsChange} ts-auto-guard:type-guard
 */
export type MarketsChange = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  mc: any[];
};
