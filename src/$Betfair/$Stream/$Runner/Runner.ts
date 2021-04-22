import fs from 'fs';

import * as $Log from '$Log';
import * as $Utils from '$Utils';
import {
  MARKET_DEFINITION_CHANGE_RESPONSE,
  Responses,
  RUNNER_ATB_CHANGE_RESPONSE,
  RUNNER_ATL_CHANGE_RESPONSE,
  RUNNER_BATB_CHANGE_RESPONSE,
  RUNNER_BATL_CHANGE_RESPONSE,
  RUNNER_BDATB_CHANGE_RESPONSE,
  RUNNER_BDATL_CHANGE_RESPONSE,
  RUNNER_LTP_CHANGE_RESPONSE,
  RUNNER_SPB_CHANGE_RESPONSE,
  RUNNER_SPF_CHANGE_RESPONSE,
  RUNNER_SPL_CHANGE_RESPONSE,
  RUNNER_SPN_CHANGE_RESPONSE,
  RUNNER_TRD_CHANGE_RESPONSE,
  RUNNER_TV_CHANGE_RESPONSE,
} from '$Betfair/$Stream/$MarketsSubscription';

export class Runner {
  public id: number;
  public marketId: string;
  public sortPriority: number;
  public status: string;
  public avToBack: Map<number, number>;
  public avToLay: Map<number, number>;
  public bspFarPrice: number;
  public bspNearPrice: number;
  public bspFinalPrice: number;
  public bspPreOnBack: number;
  public bspPreOnLay: number;
  public spProjLayers: number;
  public spProjBackers: number;
  public bookOnLay: number;
  public tradedVolume: number;
  public tradedVolumeBack: number;
  public tradedVolumeLay: number;
  public tradedLastPrice: number;
  public tradedByPrice: Prices;
  public tradesBack: Map<number, number>;
  public tradesLay: Map<number, number>;
  public tickChange: number;
  public spBackChange: number;
  public spLayChange: number;
  public spMidChange: number;
  public tradedByPriceBspBack: Prices;
  public tradedByPriceBspLay: Prices;
  public ladderBack: Map<number, [number, number]>;
  public ladderLay: Map<number, [number, number]>;
  public ladderBackByPrice: Map<number, number>;
  public ladderLayByPrice: Map<number, number>;
  public ladderBackWithVirtual: Map<number, [number, number]>;
  public ladderLayWithVirtual: Map<number, [number, number]>;
  public ladderBackWithVirtualByPrice: Map<number, number>;
  public ladderLayWithVirtualByPrice: Map<number, number>;
  private _hasInitialized: boolean;

  constructor(i: { marketId: string; runnerId: number }) {
    this.id = i.runnerId;
    this.marketId = i.marketId;
    this.sortPriority = 0;
    this.bspFarPrice = 0;
    this.bspNearPrice = 0;
    this.bspFinalPrice = 0;
    this.bspPreOnBack = 0;
    this.bspPreOnLay = 0;
    this.tickChange = 0;
    this.spBackChange = 0;
    this.spLayChange = 0;
    this.spMidChange = 0;
    this.tradesBack = new Map ();
    this.tradesLay = new Map ();
    this.tradedVolume = 0;
    this.tradedVolumeBack = 0;
    this.tradedVolumeLay = 0;
    this.tradedLastPrice = 0;
    this.spProjLayers = 0;
    this.spProjBackers = 0;
    this.bookOnLay = 0;
    this.tradedByPrice = {};
    this.tradedByPriceBspBack = {};
    this.tradedByPriceBspLay = {};
    this.ladderBack = new Map ();
    this.ladderLay = new Map ();
    this.ladderBackByPrice = new Map ();
    this.ladderLayByPrice = new Map ();
    this.ladderBackWithVirtual = new Map ();
    this.ladderLayWithVirtual = new Map ();
    this.ladderBackWithVirtualByPrice = new Map ();
    this.ladderLayWithVirtualByPrice = new Map ();
    this.avToBack = new Map ();
    this.avToLay = new Map ();
    this._hasInitialized = false;

    this.status = 'UNK';

    log.info (
      `runner was created [id: ${this.id}; marketId: ${this.marketId};]`
    );
  }

  onMarketDefinitionChange(
    i: MARKET_DEFINITION_CHANGE_RESPONSE['marketDefinition']['runners'][0]
  ) {
    this.status = i.status;
    this.sortPriority = i.sortPriority;

    if (i.bsp) {
      this.bspFinalPrice = i.bsp;
    }
  }

  onTvChange(i: RUNNER_TV_CHANGE_RESPONSE) {
    this.tradedVolume = i.tv;
  }

  onLtpChange(i: RUNNER_LTP_CHANGE_RESPONSE) {
    this.tradedLastPrice = i.ltp;
  }

  onTrdChange(i: RUNNER_TRD_CHANGE_RESPONSE) {
    const currentNow = new Date ();
    const currentDate = currentNow.toISOString ().split ('T')[0];
    const currentTime = currentNow.toISOString ().split ('T')[1].split ('Z')[0];

    this.tradedByPrice = i.trd.reduce ((pV, [price, size]) => {
      if (this._hasInitialized) {
        const previousVolume = this.tradedByPrice[price] || 0;
        const tradeSize = Math.round ((size - previousVolume) * 100) / 100;

        const existsOnBackLadder = this.ladderBackByPrice.has (price);
        const existsOnLayLadder = this.ladderLayByPrice.has (price);
        const existsOnVirtualBackLadder = this.ladderBackWithVirtualByPrice.has (
          price
        );
        const existsOnVirtualLayLadder = this.ladderLayWithVirtualByPrice.has (
          price
        );
        const existsOnAtl = (i as any)?.atl?.find((i: any) => i[0] === price);
        const existsOnAtb = (i as any)?.atb?.find((i: any) => i[0] === price);

        if (existsOnBackLadder || (existsOnAtb && !existsOnAtl)) {
          this.tradesBack.set (
            price,
            tradeSize + (this.tradesBack.get (price)! || 0)
          );
          this.tradedVolumeBack += tradeSize;
        }

        if (existsOnLayLadder || (!existsOnAtb && existsOnAtl)) {
          this.tradesLay.set (
            price,
            tradeSize + (this.tradesLay.get (price)! || 0)
          );
          this.tradedVolumeLay += tradeSize;
        }
      }

      return {
        ...pV,
        [price]: size,
      };
    }, this.tradedByPrice);
  }

  onAtbChange(i: RUNNER_ATB_CHANGE_RESPONSE) {
    i.atb.forEach ((cV) => {
      this.avToBack.set (cV[0], cV[1]);
    });
  }

  onAtlChange(i: RUNNER_ATL_CHANGE_RESPONSE) {
    i.atl.forEach ((cV) => {
      this.avToLay.set (cV[0], cV[1]);
    });
  }

  onBatbChange(i: RUNNER_BATB_CHANGE_RESPONSE) {
    i.batb.forEach (([k, price, size]) => {
      if (price === 0 && size === 0) {
        this.ladderBack.delete (k);
        this.ladderBackByPrice.delete (price);

        return;
      }

      this.ladderBack.set (k, [price, size]);
      this.ladderBackByPrice.set (price, size);
    });

    const spfCalcBackers = Array.from (this.avToBack.keys ())
      .sort ((a: number, b: number) => b - a)
      .reduce (
        (pV, cV) => {
          const amountAvailable = this.avToBack.get (cV)!;
          if (pV.matchRemainder <= 0 || amountAvailable <= 0) return pV;

          const liquidityTaken =
            amountAvailable < pV.matchRemainder
              ? amountAvailable
              : pV.matchRemainder;
          const matchRemainder = pV.matchRemainder - liquidityTaken;

          const oddsTotal = pV.oddsTotal + cV * liquidityTaken;
          const oddsNo = pV.oddsNo + liquidityTaken;

          return {
            matchRemainder,
            oddsTotal,
            oddsNo,
          };
        },
        {
          oddsTotal: 0,
          oddsNo: 0,
          matchRemainder: this.tradedByPriceBspLay['1.01'] || 0,
        }
      );

    const newSpProj = spfCalcBackers.oddsTotal / spfCalcBackers.oddsNo || 0;
    this.spBackChange += $Utils.calcTickChange (this.spProjBackers, newSpProj);
    this.spProjBackers = newSpProj;
  }

  onBatlChange(i: RUNNER_BATL_CHANGE_RESPONSE) {
    i.batl.forEach (([k, price, size]) => {
      if (price === 0 && size === 0) {
        this.ladderLay.delete (k);
        this.ladderLayByPrice.delete (price);

        return;
      }

      this.ladderLay.set (k, [price, size]);
      this.ladderLayByPrice.set (price, size);
    });

    const spfCalcLayers = Array.from (this.avToLay.keys ())
      .sort ((a: number, b: number) => a - b)
      .reduce (
        (pV, cV) => {
          const amountAvailable = this.avToLay.get (cV)!;
          if (pV.matchRemainder <= 0 || amountAvailable <= 0) return pV;

          const liquidityTaken =
            amountAvailable < pV.matchRemainder
              ? amountAvailable
              : pV.matchRemainder;
          const matchRemainder = pV.matchRemainder - liquidityTaken;

          const oddsTotal = pV.oddsTotal + cV * liquidityTaken;
          const oddsNo = pV.oddsNo + liquidityTaken;

          return {
            matchRemainder,
            oddsTotal,
            oddsNo,
          };
        },
        {
          oddsTotal: 0,
          oddsNo: 0,
          matchRemainder: this.tradedByPriceBspBack['1000'] || 0,
        }
      );

    const newSpProj = spfCalcLayers.oddsTotal / spfCalcLayers.oddsNo;
    this.spLayChange += $Utils.calcTickChange (this.spProjLayers, newSpProj);
    this.spProjLayers = newSpProj;
  }

  onBdatbChange(i: RUNNER_BDATB_CHANGE_RESPONSE) {
    i.bdatb.forEach (([k, price, size]) => {
      if (price === 0 && size === 0) {
        this.ladderBackWithVirtual.delete (k);
        this.ladderBackWithVirtualByPrice.delete (price);

        return;
      }
      this.ladderBackWithVirtual.set (k, [price, size]);
      this.ladderBackWithVirtualByPrice.set (price, size);
    });
  }

  onBdatlChange(i: RUNNER_BDATL_CHANGE_RESPONSE) {
    i.bdatl.forEach (([k, price, size]) => {
      if (price === 0 && size === 0) {
        this.ladderLayWithVirtual.delete (k);
        this.ladderLayWithVirtualByPrice.delete (price);

        return;
      }
      this.ladderLayWithVirtual.set (k, [price, size]);
      this.ladderLayWithVirtualByPrice.set (price, size);
    });
  }

  onSpbChange(i: RUNNER_SPB_CHANGE_RESPONSE) {
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

  onSplChange(i: RUNNER_SPL_CHANGE_RESPONSE) {
    this.tradedByPriceBspLay = i.spl.reduce ((pV, cV) => {
      const minusPreviousPrice = cV[1] - (this.tradedByPriceBspLay[cV[0]] || 0);
      this.bspPreOnBack = this.bspPreOnBack + minusPreviousPrice;

      return {
        ...pV,
        [cV[0]]: cV[1],
      };
    }, this.tradedByPriceBspLay);
  }

  onSpnChange(i: RUNNER_SPN_CHANGE_RESPONSE) {
    this.bspNearPrice = i.spn;
  }

  onSpfChange(i: RUNNER_SPF_CHANGE_RESPONSE) {
    this.bspFarPrice = i.spf;
  }

  onChange(i: Responses) {
    this._hasInitialized = true;
  }

  getBestAvToBack() {
    return Array.from (this.avToBack.entries ())
      .sort ((a: [number, number], b: [number, number]) => b[0] - a[0])
      .reduce (
        (pV, cV) => {
          if (cV[1] === 0 || pV[1] > 0) return pV;
          return cV;
        },
        [0, 0]
      );
  }

  getBestAvToLay() {
    return Array.from (this.avToLay.entries ())
      .sort ((a: [number, number], b: [number, number]) => a[0] - b[0])
      .reduce (
        (pV, cV) => {
          if (cV[1] === 0 || pV[1] > 0) return pV;
          return cV;
        },
        [0, 0]
      );
  }

  indicatorVwap() {
    return $Utils.calculateVwap (
      Object.keys (this.tradedByPrice).map ((i) => [this.tradedByPrice[i], i])
    );
  }

  indicatorVwapBack() {
    return $Utils.calculateVwap (this.tradesBack);
  }

  indicatorVwapLay() {
    return $Utils.calculateVwap (this.tradesLay);
  }
}

type Prices = {
  [price: string]: number;
};

/* -------------------------------------------------------------------------- */
/*                               SIDE FUNCTIONS                               */
/* -------------------------------------------------------------------------- */

const log = $Log.log.child ({
  module: 'Betfair',
  sub: 'Runner',
});
