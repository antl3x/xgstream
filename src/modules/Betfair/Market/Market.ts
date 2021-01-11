import {
  MarketDefinition,
  RunnerChange,
  StreamMessageMarketChange,
} from '@modules/Betfair';
import { createRunner, Runner } from '../Runner/Runner';

type RunnersCache = {
  [runnerId: string]: Runner;
};

type MarketProps = {
  id: string;
  marketDefinition: MarketDefinition;
  runnersChanges: RunnerChange[];
  matchedTotal?: number | undefined;
};

export interface Market {
  id: () => string;
  marketDefinition: () => MarketDefinition;
  matchedTotal: () => number;
  runnersCache: () => RunnersCache;
  updateCache: (msg: StreamMessageMarketChange['mc'][0]) => void;
}

export const createMarket = ({
  matchedTotal = 0,
  marketDefinition,
  runnersChanges,
  ...props
}: MarketProps): Market => {
  let runnersCache: RunnersCache = {};

  function _init() {
    _createRunners ();
    _updateRunners ();
  }

  function updateCache(mChange: StreamMessageMarketChange['mc'][0]) {
    if (mChange.marketDefinition) {
      marketDefinition = mChange.marketDefinition;
    }

    if (mChange.tv) {
      matchedTotal = mChange.tv;
    }

    if (mChange.rc) {
      for (const rChange of mChange.rc) {
        runnersCache[rChange.id].updateCache ({ rChange });
      }
    }
  }

  function _createRunners() {
    runnersCache = marketDefinition.runners.reduce (
      (pV, cV) => ({
        ...pV,
        [cV.id]: createRunner ({ ...cV, marketId: props.id }),
      }),
      {}
    );
  }

  function _updateRunners() {
    if (runnersChanges) {
      for (const rChange of runnersChanges) {
        runnersCache[rChange.id].updateCache ({ rChange });
      }
    }
  }

  _init ();
  return {
    id: () => props.id,
    marketDefinition: () => marketDefinition,
    matchedTotal: () => matchedTotal,
    runnersCache: () => runnersCache,
    updateCache,
  };
};
