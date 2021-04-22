import * as $Log from '$Log';

import {
  MARKET_DEFINITION_CHANGE_RESPONSE,
  MARKET_TV_CHANGE_RESPONSE,
  Responses,
} from '$Betfair/$Stream/$MarketsSubscription';

export class Market {
  public id: string;
  public tradedVolume: number;
  public noOfRunners: number;
  public status = 'UNK';

  constructor(i: { marketId: string }) {
    this.id = i.marketId;
    this.tradedVolume = 0;
    this.noOfRunners = 0;
    log.info (`market was created [id: ${this.id}]`);
  }

  onChange(i: Responses) {
    return;
  }

  onMarketDefinitionChange(i: MARKET_DEFINITION_CHANGE_RESPONSE) {
    this.status = i.marketDefinition.status;
    this.noOfRunners = i.marketDefinition.runners.length;
  }

  onMarketTvChange(i: MARKET_TV_CHANGE_RESPONSE) {
    this.tradedVolume = i.tv;
  }
}

/* -------------------------------------------------------------------------- */
/*                               SIDE FUNCTIONS                               */
/* -------------------------------------------------------------------------- */

const log = $Log.log.child ({
  module: 'Betfair',
  sub: 'Market',
});
