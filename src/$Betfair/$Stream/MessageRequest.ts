export type MessageRequest = Authentication | MarketSubscription;

/////////////////////////////
//  Message Request Types //
///////////////////////////

export type Authentication = {
  op: 'authentication';
  id: number;
  appKey: string;
  session: string;
};

export const makeAuthentication = (
  i: Omit<Authentication, 'op'>
): Authentication => ({
  op: 'authentication',
  ...i,
});

export type MarketSubscription = {
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

export const makeMarketSubscription = (
  i: Omit<MarketSubscription, 'op'>
): MarketSubscription => ({
  op: 'marketSubscription',
  ...i,
});
