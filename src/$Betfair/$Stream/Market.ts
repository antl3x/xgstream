export type MarketDefinition = {
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

// import {
//   MarketDefinition,
//   RunnerChange,
//   StreamMessageMarketChange,
//   Runner,
//   createRunner,
// } from '@private/BetfairStream';

// type RunnersCache = {
//   [runnerId: string]: Runner;
// };

// type MarketProps = {
//   id: string;
//   marketDefinition: MarketDefinition;
//   runnersChanges: RunnerChange[];
//   matchedTotal?: number | undefined;
// };

// export interface Market {
//   id: () => string;
//   marketDefinition: () => MarketDefinition;
//   matchedTotal: () => number;
//   runnersCache: () => RunnersCache;
//   updateCache: (msg: StreamMessageMarketChange['mc'][0]) => void;
// }

// export const createMarket = ({
//   matchedTotal = 0,
//   marketDefinition,
//   runnersChanges,
//   ...props
// }: MarketProps): Market => {
//   let runnersCache: RunnersCache = {};

//   function _init() {
//     _createRunners ();
//     _updateRunners ();
//   }

//   function updateCache(mChange: StreamMessageMarketChange['mc'][0]) {
//     if (mChange.marketDefinition) {
//       marketDefinition = mChange.marketDefinition;
//     }

//     if (mChange.tv) {
//       matchedTotal = mChange.tv;
//     }

//     if (mChange.rc) {
//       for (const rChange of mChange.rc) {
//         runnersCache[rChange.id].updateCache ({ rChange });
//       }
//     }
//   }

//   function _createRunners() {
//     runnersCache = marketDefinition.runners.reduce (
//       (pV, cV) => ({
//         ...pV,
//         [cV.id]: createRunner ({ ...cV, marketId: props.id }),
//       }),
//       {}
//     );
//   }

//   function _updateRunners() {
//     if (runnersChanges) {
//       for (const rChange of runnersChanges) {
//         runnersCache[rChange.id].updateCache ({ rChange });
//       }
//     }
//   }

//   _init ();
//   return {
//     id: () => props.id,
//     marketDefinition: () => marketDefinition,
//     matchedTotal: () => matchedTotal,
//     runnersCache: () => runnersCache,
//     updateCache,
//   };
// };
