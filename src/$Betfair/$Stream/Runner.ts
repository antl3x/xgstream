import * as $Log from '$Log';

export class Runner {
  public id: number;
  public marketId: string;

  private _log = $Log.log.child ({
    module: 'Betfair',
    sub: 'Runner',
  });

  constructor(i: { marketId: string; runnerId: number }) {
    this.id = i.runnerId;
    this.marketId = i.marketId;

    this._log.info (
      `runner was created [id: ${this.id}; marketId: ${this.marketId};]`
    );
  }
}

// type Prices = {
//   [price: string]: number;
// };

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
// public marketPrices: {
//   matchedLastPrice: number;
//   matchedTotal: number;
//   matchedByPrice: Prices;
//   availableToLay: Prices;
//   availableToBack: Prices;
//   bestAvailableToLay: Prices;
//   bestAvailableToBack: Prices;
//   bestDisplayAvailableToLay: Prices;
//   bestDisplayAvailableToBack: Prices;
// } = {
//   matchedLastPrice: 0,
//   matchedTotal: 0,
//   matchedByPrice: {},
//   availableToBack: {},
//   availableToLay: {},
//   bestAvailableToBack: {},
//   bestAvailableToLay: {},
//   bestDisplayAvailableToBack: {},
//   bestDisplayAvailableToLay: {},
// };
