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
      bsp?: number;
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
  mc: { id: string }[];
};

/**
 * @see {isRunnersChange} ts-auto-guard:type-guard
 */
export type RunnersChange = {
  rc: any[];
};

/**
 * @see {isRunnerAtbChange} ts-auto-guard:type-guard
 */
export type RunnerAtbChange = {
  id: number;
  atb: [number, number][];
};

/**
 * @see {isRunnerAtlChange} ts-auto-guard:type-guard
 */
export type RunnerAtlChange = {
  id: number;
  atl: [number, number][];
};

/**
 * @see {isRunnerBatbChange} ts-auto-guard:type-guard
 */
export type RunnerBatbChange = {
  id: number;
  batb: [number, number, number][];
};

/**
 * @see {isRunnerBatlChange} ts-auto-guard:type-guard
 */
export type RunnerBatlChange = {
  id: number;
  batl: [number, number, number][];
};

/**
 * @see {isRunnerBdatbChange} ts-auto-guard:type-guard
 */
export type RunnerBdatbChange = {
  id: number;
  bdatb: [number, number, number][];
};

/**
 * @see {isRunnerBdatlChange} ts-auto-guard:type-guard
 */
export type RunnerBdatlChange = {
  id: number;
  bdatl: [number, number, number][];
};

/**
 * @see {isRunnerTrdChange} ts-auto-guard:type-guard
 */
export type RunnerTrdChange = {
  id: number;
  trd: [number, number][];
};

/**
 * @see {isRunnerTvChange} ts-auto-guard:type-guard
 */
export type RunnerTvChange = {
  id: number;
  tv: number;
};

/**
 * @see {isRunnerLtpChange} ts-auto-guard:type-guard
 */
export type RunnerLtpChange = {
  id: number;
  ltp: number;
};

/**
 * @see {isRunnerSpbChange} ts-auto-guard:type-guard
 */
export type RunnerSpbChange = {
  id: number;
  spb: [number, number][];
};

/**
 * @see {isRunnerSplChange} ts-auto-guard:type-guard
 */
export type RunnerSplChange = {
  id: number;
  spl: [number, number][];
};

/**
 * @see {isRunnerSpnChange} ts-auto-guard:type-guard
 */
export type RunnerSpnChange = {
  id: number;
  spn: number;
};

/**
 * @see {isRunnerSpfChange} ts-auto-guard:type-guard
 */
export type RunnerSpfChange = {
  id: number;
  spf: number;
};
