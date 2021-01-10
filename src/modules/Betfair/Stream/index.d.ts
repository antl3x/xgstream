export type StreamMessage =
  | StreamMessageFailure
  | StreamMessageSuccess
  | StreamMessageConnection
  | StreamMessageMarketChange
  | StreamMessageOrderChange;

export type StreamMessageConnection = {
  op: 'connection';
  connectionId: string;
};

export type StreamMessageFailure = {
  op: 'status';
  id: number;
  connectionId: string;
  connectionClosed: boolean;
  statusCode: 'FAILURE';
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

export type StreamMessageSuccess = {
  op: 'status';
  id: number;
  statusCode: 'SUCCESS';
  connectionClosed: boolean;
  connectionsAvailable: number;
};

export type StreamMessageRequestSubscription = {
  segmentationEnabled?: boolean;
  conflateMs?: number;
  heartbeatMs?: number;
  initialClk?: string;
  clk?: string;
};

export type StreamMessageRequestMarketSubscription = StreamMessageRequestSubscription & {
  op: 'marketSubscription';
  marketFilter: MarketFilter;
  marketDataFilter: MarketDataFilter;
};

export type StreamMessageChange = {
  ct?: 'SUB_IMAGE' | 'RESUB_DELTA' | 'HEARTBEAT';
  segmentType?: 'SEG_START' | 'SEG' | 'SEG_END';
  status?: '503';
  conflateMs?: number;
  heartbeatMs: number;
  pt: number;
  initialClk: string;
  clk: string;
};

export type StreamMessageMarketChange = StreamMessageChange & {
  op: 'mcm';
  mc: {
    id: string;
    img?: boolean;
    tv?: number;
    marketDefinition?: {
      bspMarket: boolean;
      turnInPlayEnabled: boolean;
      persistenceEnabled: boolean;
      marketBaseRate: number;
      eventId: string;
      eventTypeId: number;
      numberOfWinners: number;
      bettingType:
        | 'ODDS'
        | 'LINE'
        | 'RANGE'
        | 'ASIAN_HANDICAP_DOUBLE_LINE'
        | 'ASIAN_HANDICAP_SINGLE_LINE'
        | 'FIXED_ODDS';
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
        sortPriority: number;
        id: number;
      }[];
      regulators: string[];
      countryCode: string;
      venue: string;
      discountAllowed: boolean;
      timezone: string;
      openDate: string;
      version: number;
      priceLadderDefinition: {
        type: 'CLASSIC' | 'FINEST' | 'LINE_RANGE';
      };
    };
    rc: {
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
    }[];
  }[];
};

export type StreamMessageOrderChange = {
  op: 'ocm';
};

export type MarketFilter = {
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

export type MarketDataFilter = {
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
