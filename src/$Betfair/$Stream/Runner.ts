import * as $Log from '$Log';
import {
  MarketDefinitionChange,
  RunnerAtbChange,
  RunnerAtlChange,
  RunnerBatbChange,
  RunnerBatlChange,
  RunnerBdatbChange,
  RunnerBdatlChange,
  RunnerLtpChange,
  RunnerSpbChange,
  RunnerSpfChange,
  RunnerSplChange,
  RunnerSpnChange,
  RunnerTrdChange,
  RunnerTvChange,
} from './MessageResponse';

export class Runner {
  public id: number;
  public marketId: string;
  public sortPriority: number;
  public status: string;
  public bspFarPrice: number;
  public bspNearPrice: number;
  public bspFinalPrice: number;
  public bspPreOnBack: number;
  public bspPreOnLay: number;
  public tradedVolume: number;
  public tradedLastPrice: number;
  public tradedByPrice: Prices;
  public tradedByPriceBspBack: Prices;
  public tradedByPriceBspLay: Prices;
  public availableToLayByPrice: Prices;
  public availableToBackByPrice: Prices;
  public bestAvailableToLayByPrice: Prices;
  public bestAvailableToBackByPrice: Prices;
  public bestDisplayAvailableToLayByPrice: Prices;
  public bestDisplayAvailableToBackByPrice: Prices;

  private _log = $Log.log.child ({
    module: 'Betfair',
    sub: 'Runner',
  });

  constructor(i: { marketId: string; runnerId: number }) {
    this.id = i.runnerId;
    this.marketId = i.marketId;
    this.sortPriority = 0;
    this.bspFarPrice = 0;
    this.bspNearPrice = 0;
    this.bspFinalPrice = 0;
    this.bspPreOnBack = 0;
    this.bspPreOnLay = 0;
    this.tradedVolume = 0;
    this.tradedLastPrice = 0;
    this.tradedByPrice = {};
    this.tradedByPriceBspBack = {};
    this.tradedByPriceBspLay = {};
    this.availableToLayByPrice = {};
    this.availableToBackByPrice = {};
    this.bestAvailableToLayByPrice = {};
    this.bestAvailableToBackByPrice = {};
    this.bestDisplayAvailableToLayByPrice = {};
    this.bestDisplayAvailableToBackByPrice = {};
    this.status = 'UNK';

    this._log.info (
      `runner was created [id: ${this.id}; marketId: ${this.marketId};]`
    );
  }

  onMarketDefinitionChange(
    i: MarketDefinitionChange['marketDefinition']['runners'][0]
  ) {
    this.status = i.status;
    this.sortPriority = i.sortPriority;

    if (i.bsp) {
      this.bspFinalPrice = i.bsp;
    }
  }

  onTvChange(i: RunnerTvChange) {
    this.tradedVolume = i.tv;
  }

  onLtpChange(i: RunnerLtpChange) {
    this.tradedLastPrice = i.ltp;
  }

  onTrdChange(i: RunnerTrdChange) {
    this.tradedByPrice = i.trd.reduce ((pV, cV) => {
      return {
        ...pV,
        [cV[0]]: cV[1],
      };
    }, this.tradedByPrice);
  }

  onAtbChange(i: RunnerAtbChange) {
    this.availableToBackByPrice = i.atb.reduce ((pV, cV) => {
      return {
        ...pV,
        [cV[0]]: cV[1],
      };
    }, this.availableToBackByPrice);
  }

  onAtlChange(i: RunnerAtlChange) {
    this.availableToLayByPrice = i.atl.reduce ((pV, cV) => {
      return {
        ...pV,
        [cV[0]]: cV[1],
      };
    }, this.availableToLayByPrice);
  }

  onBatbChange(i: RunnerBatbChange) {
    this.bestAvailableToBackByPrice = i.batb.reduce ((pV, cV) => {
      return {
        ...pV,
        [cV[1]]: cV[2],
      };
    }, this.bestAvailableToBackByPrice);
  }

  onBatlChange(i: RunnerBatlChange) {
    this.bestAvailableToLayByPrice = i.batl.reduce ((pV, cV) => {
      return {
        ...pV,
        [cV[1]]: cV[2],
      };
    }, this.bestAvailableToLayByPrice);
  }

  onBdatbChange(i: RunnerBdatbChange) {
    this.bestDisplayAvailableToBackByPrice = i.bdatb.reduce ((pV, cV) => {
      return {
        ...pV,
        [cV[1]]: cV[2],
      };
    }, this.bestDisplayAvailableToBackByPrice);
  }

  onBdatlChange(i: RunnerBdatlChange) {
    this.bestDisplayAvailableToLayByPrice = i.bdatl.reduce ((pV, cV) => {
      return {
        ...pV,
        [cV[1]]: cV[2],
      };
    }, this.bestDisplayAvailableToLayByPrice);
  }

  onSpbChange(i: RunnerSpbChange) {
    // ------------- { spb: [ [ 1000, 14.59 ] ], id: 35732104 } = LAY @ 20 NO ODDS
    this.tradedByPriceBspBack = i.spb.reduce ((pV, cV) => {
      const minusPreviousPrice =
        cV[1] - (this.tradedByPriceBspBack[cV[0]] || 0);
      this.bspPreOnLay = this.bspPreOnLay + minusPreviousPrice;

      return {
        ...pV,
        [cV[0]]: cV[1],
      };
    }, this.tradedByPriceBspBack);
  }

  onSplChange(i: RunnerSplChange) {
    this.tradedByPriceBspLay = i.spl.reduce ((pV, cV) => {
      const minusPreviousPrice = cV[1] - (this.tradedByPriceBspLay[cV[0]] || 0);
      this.bspPreOnBack = this.bspPreOnBack + minusPreviousPrice;

      return {
        ...pV,
        [cV[0]]: cV[1],
      };
    }, this.tradedByPriceBspLay);
  }

  onSpnChange(i: RunnerSpnChange) {
    this.bspNearPrice = i.spn;
  }

  onSpfChange(i: RunnerSpfChange) {
    this.bspFarPrice = i.spf;
  }
}

type Prices = {
  [price: string]: number;
};

// public startingPrices: {
//   farPrice: number;
//   finalPrice: number;
//   nearPrice: number;
//   backStakeTaken: Prices;
//   layStakeTaken: Prices;
// } = {
//   backStakeTaken: {},
//   layStakeTaken: {},
//   farPrice: 0,
//   nearPrice: 0,
//   finalPrice: 0,
// };
