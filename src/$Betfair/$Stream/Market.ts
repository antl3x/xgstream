import * as $Log from '$Log';
import { MarketDefinitionChange, MarketTvChange } from './MessageResponse';

export class Market {
  public id: string;
  public tradedVolume: number;
  public status = 'UNK';

  private _log = $Log.log.child ({
    module: 'Betfair',
    sub: 'Market',
  });

  constructor(i: { marketId: string }) {
    this.id = i.marketId;
    this.tradedVolume = 0;
    this._log.info (`market was created [id: ${this.id}]`);
  }

  onMarketDefinitionChange(i: MarketDefinitionChange) {
    this.status = i.marketDefinition.status;
  }

  onMarketTvChange(i: MarketTvChange) {
    this.tradedVolume = i.tv;
  }
}
