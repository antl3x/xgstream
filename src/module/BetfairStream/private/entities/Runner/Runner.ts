import { RunnerChange } from '@private/BetfairStream';

type Prices = {
  [price: string]: number;
};

type MarketPrices = {
  matchedLastPrice: number;
  matchedTotal: number;
  matchedByPrice: Prices;
  availableToLay: Prices;
  availableToBack: Prices;
  bestAvailableToLay: Prices;
  bestAvailableToBack: Prices;
  bestDisplayAvailableToLay: Prices;
  bestDisplayAvailableToBack: Prices;
};

type StartingPrices = {
  farPrice: number;
  finalPrice: number;
  nearPrice: number;
  backStakeTaken: Prices;
  layStakeTaken: Prices;
};

type RunnerProps = {
  id: number;
  marketId: string;
  sortPriority: number;
  status:
    | 'ACTIVE'
    | 'WINNER'
    | 'LOSER'
    | 'PLACED'
    | 'REMOVED_VACANT'
    | 'REMOVED'
    | 'HIDDEN';
};

export interface Runner {
  id: () => number;
  marketPrices: () => MarketPrices;
  startingPrices: () => StartingPrices;
  marketId: () => string;
  sortPriority: () => number;
  status: () => RunnerProps['status'];
  updateCache: ({ rChange }: { rChange: RunnerChange }) => void;
}

export const createRunner = (props: RunnerProps): Runner => {
  const marketPrices: MarketPrices = {
    matchedLastPrice: 0,
    matchedTotal: 0,
    matchedByPrice: {},
    availableToLay: {},
    availableToBack: {},
    bestAvailableToLay: {},
    bestAvailableToBack: {},
    bestDisplayAvailableToLay: {},
    bestDisplayAvailableToBack: {},
  };

  const startingPrices: StartingPrices = {
    farPrice: 0,
    finalPrice: 0,
    nearPrice: 0,
    backStakeTaken: {},
    layStakeTaken: {},
  };

  function updateCache({ rChange }: { rChange: RunnerChange }) {
    if (rChange.tv) {
      marketPrices.matchedTotal = rChange.tv;
    }

    if (rChange.ltp) {
      marketPrices.matchedLastPrice = rChange.ltp;
    }

    if (rChange.trd) {
      marketPrices.matchedByPrice = _reduceTuplePrices (rChange.trd, 'trd');
    }

    if (rChange.atb) {
      marketPrices.availableToBack = _reduceTuplePrices (rChange.atb, 'atb');
    }

    if (rChange.atl) {
      marketPrices.availableToLay = _reduceTuplePrices (rChange.atl, 'atl');
    }

    if (rChange.bdatb) {
      marketPrices.bestDisplayAvailableToBack = _reduceTriplePrices (
        rChange.bdatb,
        'bdatb'
      );
    }

    if (rChange.bdatl) {
      marketPrices.bestDisplayAvailableToLay = _reduceTriplePrices (
        rChange.bdatl,
        'bdatl'
      );
    }

    if (rChange.batb) {
      marketPrices.bestAvailableToBack = _reduceTriplePrices (
        rChange.batb,
        'batb'
      );
    }

    if (rChange.batl) {
      marketPrices.bestAvailableToLay = _reduceTriplePrices (
        rChange.batl,
        'batl'
      );
    }

    if (rChange.spn) {
      startingPrices.nearPrice = rChange.spn;
    }

    if (rChange.spf) {
      startingPrices.farPrice = rChange.spf;
    }

    if (rChange.spb) {
      startingPrices.backStakeTaken = _reduceTuplePrices (rChange.spb, `spb`);
    }

    if (rChange.spl) {
      startingPrices.layStakeTaken = _reduceTuplePrices (rChange.spl, `spl`);
    }
  }

  function _reduceTuplePrices(
    tP: [number, number][] = [],
    priceType: 'trd' | 'atb' | 'atl' | 'spb' | 'spl',
    isImage?: boolean
  ) {
    let previousValue: Prices = {};

    switch (priceType) {
      case 'trd':
        previousValue = marketPrices.matchedByPrice;
        break;
      case 'atb':
        previousValue = marketPrices.availableToBack;
        break;
      case 'atl':
        previousValue = marketPrices.availableToLay;
        break;
      case 'spb':
        previousValue = startingPrices.backStakeTaken;
        break;
      case 'spl':
        previousValue = startingPrices.layStakeTaken;
        break;
      default:
    }

    return tP.reduce ((pV, [price, amount]) => {
      // if (priceType === 'trd' && !_isImage) _onTrade (price, amount);

      if (amount === 0) {
        delete pV[price];
        return pV;
      }

      return {
        ...pV,
        [price]: amount,
      };
    }, previousValue);
  }

  function _reduceTriplePrices(
    tP: [number, number, number][] = [],
    priceType: 'bdatb' | 'bdatl' | 'batb' | 'batl'
  ) {
    let previousValue: Prices = {};

    switch (priceType) {
      case 'bdatb':
        previousValue = marketPrices.bestDisplayAvailableToBack;
        break;
      case 'bdatl':
        previousValue = marketPrices.bestDisplayAvailableToLay;
        break;
      case 'batb':
        previousValue = marketPrices.bestAvailableToBack;
        break;
      case 'batl':
        previousValue = marketPrices.bestAvailableToLay;
        break;
      default:
    }

    return tP.reduce ((pV, [price, amount]) => {
      // if (priceType === 'trd' && !_isImage) _onTrade (price, amount);
      if (amount === 0) {
        delete pV[price];
        return pV;
      }
      return {
        ...pV,
        [price]: amount,
      };
    }, previousValue);
  }

  return {
    id: () => props.id,
    marketId: () => props.marketId,
    marketPrices: () => marketPrices,
    startingPrices: () => startingPrices,
    sortPriority: () => props.sortPriority,
    status: () => props.status,
    updateCache,
  };
};
