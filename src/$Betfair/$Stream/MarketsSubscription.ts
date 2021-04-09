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
  private _runnersSubscribed: { [runnerIdAndMarketId: string]: Runner } = {};

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
    this._streamConnection.addHandler (this._msgHandler);
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

      if ($Guards.isMarketSubImage (msg)) {
        this._log.info ('markets sub images received');

        for (const mChange of msg.mc) {
          if ($Guards.isMarketDefinitionChange (mChange)) {
            this._log.info ('market definition changed');
          }

          if ($Guards.isMarketTvChange (mChange)) {
            this._log.info ('market tv changed');
          }
        }
      }
    }

    // if ($Guards.isMarketDefinitionChange (msg)) {
    //   this._log.info ('market definition changed');
    // }

    // if ($Guards.isMarketTvChange (msg)) {
    //   this._log.info ('market tv changed');
    // }

    // if ($Guards.isRunnerTrdChange (msg)) {
    //   this._log.info ('runner trd changed');
    // }

    // if ($Guards.isRunnerLtpChange (msg)) {
    //   this._log.info ('runner ltp changed');
    // }

    // if ($Guards.isRunnerTvChange (msg)) {
    //   this._log.info ('runner tv changed');
    // }

    // if ($Guards.isRunnerSpbChange (msg)) {
    //   this._log.info ('runner spb changed');
    // }

    // if ($Guards.isRunnerSplChange (msg)) {
    //   this._log.info ('runner spl changed');
    // }

    // if ($Guards.isRunnerSpnChange (msg)) {
    //   this._log.info ('runner spn changed');
    // }

    // if ($Guards.isRunnerSpfChange (msg)) {
    //   this._log.info ('runner spf changed');
    // }

    // if ($Guards.isRunnerAtbChange (msg)) {
    //   this._log.info ('runner atb changed');
    // }

    // if ($Guards.isRunnerAtlChange (msg)) {
    //   this._log.info ('runner atl changed');
    // }

    // if ($Guards.isRunnerBatbChange (msg)) {
    //   this._log.info ('runner batb changed');
    // }

    // if ($Guards.isRunnerBatlChange (msg)) {
    //   this._log.info ('runner batl changed');
    // }

    // if ($Guards.isRunnerBdatbChange (msg)) {
    //   this._log.info ('runner bdatb changed');
    // }

    // if ($Guards.isRunnerBdatlChange (msg)) {
    //   this._log.info ('runner bdatl changed');
    // }
  }
}
