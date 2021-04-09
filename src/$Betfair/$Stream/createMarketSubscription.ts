import { logChild } from '$Log';
import { Connection } from './Connection';
import { $Guards, MessageResponse, RequestMarketSubscription } from './Message';

type MarketSubscriptionInput = {
  streamConnection: Connection;
  marketFilter: RequestMarketSubscription['marketFilter'];
  marketDataFilter: RequestMarketSubscription['marketDataFilter'];
};

export const createMarketsSubscription = (i: MarketSubscriptionInput) => {
  const _id = Math.floor (Math.random () * 100 + 1);
  const log = logChild ({
    module: 'Betfair',
    sub: 'MarketsSubscription',
  });

  const requestMessage: RequestMarketSubscription = {
    op: 'marketSubscription',
    id: _id,
    marketDataFilter: i.marketDataFilter,
    marketFilter: i.marketFilter,
  };

  const _msgHandler = (msg: MessageResponse) => {
    if ($Guards.isResponseMarketSubscriptionSuccess (msg)) {
      log.info (`market subscription succeeded`);
    }
  };

  i.streamConnection.addHandler (_msgHandler);
  i.streamConnection.sendMsg (requestMessage);

  log.info (`market subscription requested`);
  log.debug (`market subscription requested`, requestMessage);
};
