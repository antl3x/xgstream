import { Connection } from './Connection';
import { MarketsSubscription } from './MarketsSubscription';
import { MarketSubscription } from './MessageRequest';

type MarketSubscriptionInput = {
  streamConnection: Connection;
  marketFilter: MarketSubscription['marketFilter'];
  marketDataFilter: MarketSubscription['marketDataFilter'];
};

export const createMarketsSubscription = (
  i: MarketSubscriptionInput
): MarketsSubscription => {
  return new MarketsSubscription (i);
};
