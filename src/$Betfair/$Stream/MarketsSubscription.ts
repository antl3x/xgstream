import * as $Log from '$Log';
import { Connection } from './Connection';
import { Market } from './Market';
import { makeMarketSubscription, MarketSubscription } from './MessageRequest';
import { MessageResponse } from './MessageResponse';
import * as $Guards from './MessageResponse.guard';
import { Runner } from './Runner';
export class MarketsSubscription {
  private _id: number;
  private _streamConnection: Connection;
  private _marketsSubscribed: { [marketId: string]: Market } = {};
  private _runnersSubscribed: { [compoundId: string]: Runner } = {};

  private _log = $Log.log.child ({
    module: 'Betfair',
    sub: 'MarketsSubscription',
  });

  constructor(i: {
    streamConnection: Connection;
    marketFilter: MarketSubscription['marketFilter'];
    marketDataFilter: MarketSubscription['marketDataFilter'];
  }) {
    this._id = Math.floor (Math.random () * 100 + 1);
    this._streamConnection = i.streamConnection;
    this._streamConnection.addHandler (this._msgHandler.bind (this));
    this._streamConnection.sendMsg (
      makeMarketSubscription ({
        id: this._id,
        marketDataFilter: i.marketDataFilter,
        marketFilter: i.marketFilter,
      })
    );
    this._log.info ('markets subscription requested');
  }

  private _msgHandler(msg: MessageResponse) {
    if ($Guards.isMarketHeartbeat (msg)) {
      this._log.info ('markets subscription heartbeat received');
    }

    if ($Guards.isMarketsChange (msg)) {
      this._log.info ('markets changes received');

      for (const mChange of msg.mc) {
        this._addMarket ({ marketId: mChange.id });

        if ($Guards.isMarketSubImage (msg)) {
          this._log.info ('markets sub image received');
        }

        if ($Guards.isMarketDefinitionChange (mChange)) {
          this._log.info ('market definition changed');
          this._marketsSubscribed[mChange.id].onMarketDefinitionChange (mChange);

          for (const rChange of mChange.marketDefinition.runners) {
            const compoundId = rChange.id + mChange.id;
            this._addRunner ({ runnerId: rChange.id, marketId: mChange.id });
            this._runnersSubscribed[compoundId].onMarketDefinitionChange (
              rChange
            );
          }
        }

        if ($Guards.isMarketTvChange (mChange)) {
          this._log.info ('market tv changed');
          this._marketsSubscribed[mChange.id].onMarketTvChange (mChange);
        }

        if ($Guards.isRunnersChange (mChange)) {
          this._log.info ('runners changes received');

          for (const rChange of mChange.rc) {
            const compoundId = rChange.id + mChange.id;
            this._addRunner ({ runnerId: rChange.id, marketId: mChange.id });

            if ($Guards.isRunnerTvChange (rChange)) {
              this._log.info ('runner tv changed');
              this._runnersSubscribed[compoundId].onTvChange (rChange);
            }

            if ($Guards.isRunnerTrdChange (rChange)) {
              this._log.info ('runner trd changed');
              this._runnersSubscribed[compoundId].onTrdChange (rChange);
            }

            if ($Guards.isRunnerLtpChange (rChange)) {
              this._log.info ('runner ltp changed');
              this._runnersSubscribed[compoundId].onLtpChange (rChange);
            }

            if ($Guards.isRunnerSpbChange (rChange)) {
              this._log.info ('runner spb changed');
              this._runnersSubscribed[compoundId].onSpbChange (rChange);
            }

            if ($Guards.isRunnerSplChange (rChange)) {
              this._log.info ('runner spl changed');
              this._runnersSubscribed[compoundId].onSplChange (rChange);
            }

            if ($Guards.isRunnerSpnChange (rChange)) {
              this._log.info ('runner spn changed');
              this._runnersSubscribed[compoundId].onSpnChange (rChange);
            }

            if ($Guards.isRunnerSpfChange (rChange)) {
              this._log.info ('runner spf changed');
              this._runnersSubscribed[compoundId].onSpfChange (rChange);
            }

            if ($Guards.isRunnerAtbChange (rChange)) {
              this._log.info ('runner atb changed');
              this._runnersSubscribed[compoundId].onAtbChange (rChange);
            }

            if ($Guards.isRunnerAtlChange (rChange)) {
              this._log.info ('runner atl changed');
              this._runnersSubscribed[compoundId].onAtlChange (rChange);
            }

            if ($Guards.isRunnerBatbChange (rChange)) {
              this._log.info ('runner batb changed');
              this._runnersSubscribed[compoundId].onBatbChange (rChange);
            }

            if ($Guards.isRunnerBatlChange (rChange)) {
              this._log.info ('runner batl changed');
              this._runnersSubscribed[compoundId].onBatlChange (rChange);
            }

            if ($Guards.isRunnerBdatbChange (rChange)) {
              this._log.info ('runner bdatb changed');
              this._runnersSubscribed[compoundId].onBdatbChange (rChange);
            }

            if ($Guards.isRunnerBdatlChange (rChange)) {
              this._log.info ('runner bdatl changed');
              this._runnersSubscribed[compoundId].onBdatlChange (rChange);
            }
          }
        }
      }
    }
  }

  private _addMarket(i: { marketId: string }) {
    if (!this._marketsSubscribed[i.marketId]) {
      const newMarket = new Market ({ marketId: i.marketId });
      this._marketsSubscribed = {
        ...this._marketsSubscribed,
        [newMarket.id]: newMarket,
      };
    }
  }

  private _addRunner(i: { runnerId: number; marketId: string }) {
    const compoundId = i.runnerId + i.marketId;
    if (!this._runnersSubscribed[compoundId]) {
      const newRunner = new Runner (i);
      this._runnersSubscribed = {
        ...this._runnersSubscribed,
        [compoundId]: newRunner,
      };
    }
  }
}
