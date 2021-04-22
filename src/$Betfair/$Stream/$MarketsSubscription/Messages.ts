/* -------------------------------------------------------------------------- */
/*                              MESSAGE REQUESTS                              */
/* -------------------------------------------------------------------------- */

export type MARKET_SUBSCRIPTION_REQUEST = {
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

export const MARKET_SUBSCRIPTION_REQUEST = (
  i: Omit<MARKET_SUBSCRIPTION_REQUEST, 'op'>
): MARKET_SUBSCRIPTION_REQUEST => ({
  op: 'marketSubscription',
  ...i,
});

export type Requests = MARKET_SUBSCRIPTION_REQUEST;

/* -------------------------------------------------------------------------- */
/*                              MESSAGE RESPONSES                             */
/* -------------------------------------------------------------------------- */

/**
 * @see {isMarketHeartbeat} ts-auto-guard:type-guard
 */
export type MARKET_BEAT_RESPONSE = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  ct: 'HEARTBEAT';
};

/**
 * @see {isMarketLatency} ts-auto-guard:type-guard
 */
export type MARKET_LATENCY_RESPONSE = {
  op: 'mcm';
  status: 503;
};

/**
 * @see {isMarketSubImage} ts-auto-guard:type-guard
 */
export type MARKET_SUBIMAGE_RESPONSE = {
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
export type MARKET_RESUBIMAGE_RESPONSE = {
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
export type MARKET_TV_CHANGE_RESPONSE = {
  id: string;
  tv: number;
};

/**
 * @see {isMarketDefinitionChange} ts-auto-guard:type-guard
 */
export type MARKET_DEFINITION_CHANGE_RESPONSE = {
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
export type MARKETS_CHANGE_RESPONSE = {
  op: 'mcm';
  id: number;
  clk: string;
  pt: number;
  mc: { id: string }[];
};

/**
 * @see {isRunnersChange} ts-auto-guard:type-guard
 */
export type RUNNERS_CHANGE_RESPONSE = {
  rc: any[];
};

/**
 * @see {isRunnerAtbChange} ts-auto-guard:type-guard
 */
export type RUNNER_ATB_CHANGE_RESPONSE = {
  id: number;
  atb: [number, number][];
};

/**
 * @see {isRunnerAtlChange} ts-auto-guard:type-guard
 */
export type RUNNER_ATL_CHANGE_RESPONSE = {
  id: number;
  atl: [number, number][];
};

/**
 * @see {isRunnerBatbChange} ts-auto-guard:type-guard
 */
export type RUNNER_BATB_CHANGE_RESPONSE = {
  id: number;
  batb: [number, number, number][];
};

/**
 * @see {isRunnerBatlChange} ts-auto-guard:type-guard
 */
export type RUNNER_BATL_CHANGE_RESPONSE = {
  id: number;
  batl: [number, number, number][];
};

/**
 * @see {isRunnerBdatbChange} ts-auto-guard:type-guard
 */
export type RUNNER_BDATB_CHANGE_RESPONSE = {
  id: number;
  bdatb: [number, number, number][];
};

/**
 * @see {isRunnerBdatlChange} ts-auto-guard:type-guard
 */
export type RUNNER_BDATL_CHANGE_RESPONSE = {
  id: number;
  bdatl: [number, number, number][];
};

/**
 * @see {isRunnerTrdChange} ts-auto-guard:type-guard
 */
export type RUNNER_TRD_CHANGE_RESPONSE = {
  id: number;
  trd: [number, number][];
};

/**
 * @see {isRunnerTvChange} ts-auto-guard:type-guard
 */
export type RUNNER_TV_CHANGE_RESPONSE = {
  id: number;
  tv: number;
};

/**
 * @see {isRunnerLtpChange} ts-auto-guard:type-guard
 */
export type RUNNER_LTP_CHANGE_RESPONSE = {
  id: number;
  ltp: number;
};

/**
 * @see {isRunnerSpbChange} ts-auto-guard:type-guard
 */
export type RUNNER_SPB_CHANGE_RESPONSE = {
  id: number;
  spb: [number, number][];
};

/**
 * @see {isRunnerSplChange} ts-auto-guard:type-guard
 */
export type RUNNER_SPL_CHANGE_RESPONSE = {
  id: number;
  spl: [number, number][];
};

/**
 * @see {isRunnerSpnChange} ts-auto-guard:type-guard
 */
export type RUNNER_SPN_CHANGE_RESPONSE = {
  id: number;
  spn: number;
};

/**
 * @see {isRunnerSpfChange} ts-auto-guard:type-guard
 */
export type RUNNER_SPF_CHANGE_RESPONSE = {
  id: number;
  spf: number;
};

export type Responses =
  | MARKET_BEAT_RESPONSE
  | MARKET_LATENCY_RESPONSE
  | MARKET_SUBIMAGE_RESPONSE
  | MARKET_RESUBIMAGE_RESPONSE
  | MARKET_TV_CHANGE_RESPONSE
  | MARKET_DEFINITION_CHANGE_RESPONSE
  | RUNNERS_CHANGE_RESPONSE
  | RUNNERS_CHANGE_RESPONSE
  | RUNNERS_CHANGE_RESPONSE
  | RUNNER_ATB_CHANGE_RESPONSE
  | RUNNER_ATL_CHANGE_RESPONSE
  | RUNNER_BATB_CHANGE_RESPONSE
  | RUNNER_BATL_CHANGE_RESPONSE
  | RUNNER_BDATB_CHANGE_RESPONSE
  | RUNNER_BDATL_CHANGE_RESPONSE
  | RUNNER_TRD_CHANGE_RESPONSE
  | RUNNER_TV_CHANGE_RESPONSE
  | RUNNER_LTP_CHANGE_RESPONSE
  | RUNNER_SPB_CHANGE_RESPONSE
  | RUNNER_SPL_CHANGE_RESPONSE
  | RUNNER_SPN_CHANGE_RESPONSE
  | RUNNER_SPF_CHANGE_RESPONSE;
