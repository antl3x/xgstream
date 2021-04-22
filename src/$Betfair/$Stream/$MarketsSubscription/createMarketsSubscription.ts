import { Connection } from '$Betfair/$Stream/$Connection';

import { MarketsSubscription, CustomHandlers } from './!MarketsSubscription';
import { MARKET_SUBSCRIPTION_REQUEST } from './Messages';

type MarketSubscriptionInput = {
  streamConnection: Connection;
  marketFilter: MARKET_SUBSCRIPTION_REQUEST['marketFilter'];
  marketDataFilter: MARKET_SUBSCRIPTION_REQUEST['marketDataFilter'];
  customHandlers?: CustomHandlers;
};

export const createMarketsSubscription = (
  i: MarketSubscriptionInput
): MarketsSubscription => {
  return new MarketsSubscription (i);
};
