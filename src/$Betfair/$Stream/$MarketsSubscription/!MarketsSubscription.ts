import fs from 'fs';

import * as $Log from '$Log';
import * as $Utils from '$Utils';

import { Connection } from '$Betfair/$Stream/$Connection';
import { Runner } from '$Betfair/$Stream/$Runner';
import { Market } from '$Betfair/$Stream/$Market';

import {
  MARKET_SUBSCRIPTION_REQUEST,
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
} from './Messages';
import * as $Guards from './Messages.guard';

export class MarketsSubscription {
  private _id: number;
  private _streamConnection: Connection;
  private _customHandlers?: CustomHandlers;
  public marketsCache: MarketsCache = {};
  public runnersCache: RunnersCache = {};
  public runnersByMarket: RunnersByMarketCache = {};

  constructor(i: {
    streamConnection: Connection;
    marketFilter: MARKET_SUBSCRIPTION_REQUEST['marketFilter'];
    marketDataFilter: MARKET_SUBSCRIPTION_REQUEST['marketDataFilter'];
    customHandlers?: CustomHandlers;
  }) {
    this._id = Math.floor (Math.random () * 100 + 1);
    this._streamConnection = i.streamConnection;
    this._customHandlers = i.customHandlers;
    this._streamConnection.addHandler (this._msgHandler.bind (this));
    this._streamConnection.conn.write (
      `${JSON.stringify (
        MARKET_SUBSCRIPTION_REQUEST ({
          id: this._id,
          marketDataFilter: i.marketDataFilter,
          marketFilter: i.marketFilter,
        })
      )}\r\n`
    );

    log.info ('markets subscription requested');
  }

  private _msgHandler(msg: Responses) {
    if ($Guards.isMarketHeartbeat (msg)) {
      log.debug ('markets subscription heartbeat received');
    }

    if ($Guards.isMarketsChange (msg)) {
      log.debug ('markets changes received');

      for (const mChange of msg.mc) {
        log.debug ('market changed');
        this._addMarket ({ marketId: mChange.id });

        this._customHandlers?.beforeMarketChange &&
          this._customHandlers.beforeMarketChange ({
            msg,
            marketsCache: this.marketsCache,
            runnersByMarketsCache: this.runnersByMarket,
            runnersCache: this.runnersCache,
          });

        if ($Guards.isMarketSubImage (msg)) {
          log.debug ('markets sub image received');
        }

        if ($Guards.isMarketDefinitionChange (mChange)) {
          log.debug ('market definition changed');
          this.marketsCache[mChange.id].onMarketDefinitionChange (mChange);

          for (const rChange of mChange.marketDefinition.runners) {
            const symbolId = $Utils.toSymbol ({
              runnerId: rChange.id,
              marketId: mChange.id,
            });
            this._addRunner ({ runnerId: rChange.id, marketId: mChange.id });
            this.runnersCache[symbolId].onMarketDefinitionChange (rChange);
          }
        }

        if ($Guards.isMarketTvChange (mChange)) {
          log.debug ('market tv changed');
          this.marketsCache[mChange.id].onMarketTvChange (mChange);
        }

        if ($Guards.isRunnersChange (mChange)) {
          log.debug ('runners changes received');

          for (const rChange of mChange.rc) {
            log.debug ('runner changed');

            const symbolId = $Utils.toSymbol ({
              runnerId: rChange.id,
              marketId: mChange.id,
            });

            this._addRunner ({ runnerId: rChange.id, marketId: mChange.id });

            this._customHandlers?.beforeRunnerChange &&
              this._customHandlers.beforeRunnerChange ({
                msg: rChange,
                marketsCache: this.marketsCache,
                runnersByMarketsCache: this.runnersByMarket,
                runnersCache: this.runnersCache,
              });

            if ($Guards.isRunnerTvChange (rChange)) {
              log.debug ('runner tv changed');
              this._customHandlers?.beforeRunnerTvChange &&
                this._customHandlers.beforeRunnerTvChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });

              this.runnersCache[symbolId].onTvChange (rChange);

              this._customHandlers?.afterRunnerTvChange &&
                this._customHandlers.afterRunnerTvChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });
            }

            if ($Guards.isRunnerTrdChange (rChange)) {
              log.debug ('runner trd changed');

              this._customHandlers?.beforeRunnerTrdChange &&
                this._customHandlers.beforeRunnerTrdChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });

              this.runnersCache[symbolId].onTrdChange (rChange);

              this._customHandlers?.afterRunnerTrdChange &&
                this._customHandlers.afterRunnerTrdChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });
            }

            if ($Guards.isRunnerLtpChange (rChange)) {
              log.debug ('runner ltp changed');

              this._customHandlers?.beforeRunnerLtpChange &&
                this._customHandlers.beforeRunnerLtpChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });

              this.runnersCache[symbolId].onLtpChange (rChange);

              this._customHandlers?.afterRunnerLtpChange &&
                this._customHandlers.afterRunnerLtpChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });
            }

            if ($Guards.isRunnerSpbChange (rChange)) {
              log.debug ('runner spb changed');

              this._customHandlers?.beforeRunnerSpbChange &&
                this._customHandlers.beforeRunnerSpbChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });

              this.runnersCache[symbolId].onSpbChange (rChange);

              this._customHandlers?.afterRunnerSpbChange &&
                this._customHandlers.afterRunnerSpbChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });
            }

            if ($Guards.isRunnerSplChange (rChange)) {
              log.debug ('runner spl changed');

              this._customHandlers?.beforeRunnerSplChange &&
                this._customHandlers.beforeRunnerSplChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });

              this.runnersCache[symbolId].onSplChange (rChange);

              this._customHandlers?.afterRunnerSplChange &&
                this._customHandlers.afterRunnerSplChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });
            }

            if ($Guards.isRunnerSpnChange (rChange)) {
              log.debug ('runner spn changed');

              this._customHandlers?.beforeRunnerSpnChange &&
                this._customHandlers.beforeRunnerSpnChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });

              this.runnersCache[symbolId].onSpnChange (rChange);

              this._customHandlers?.afterRunnerSpnChange &&
                this._customHandlers.afterRunnerSpnChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });
            }

            if ($Guards.isRunnerSpfChange (rChange)) {
              log.debug ('runner spf changed');

              this._customHandlers?.beforeRunnerSpfChange &&
                this._customHandlers.beforeRunnerSpfChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });

              this.runnersCache[symbolId].onSpfChange (rChange);

              this._customHandlers?.afterRunnerSpfChange &&
                this._customHandlers.afterRunnerSpfChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });
            }

            if ($Guards.isRunnerAtbChange (rChange)) {
              log.debug ('runner atb changed');

              this._customHandlers?.beforeRunnerAtbChange &&
                this._customHandlers.beforeRunnerAtbChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });

              this.runnersCache[symbolId].onAtbChange (rChange);

              this._customHandlers?.afterRunnerAtbChange &&
                this._customHandlers.afterRunnerAtbChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });
            }

            if ($Guards.isRunnerAtlChange (rChange)) {
              log.debug ('runner atl changed');

              this._customHandlers?.beforeRunnerAtlChange &&
                this._customHandlers.beforeRunnerAtlChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });

              this.runnersCache[symbolId].onAtlChange (rChange);

              this._customHandlers?.afterRunnerAtlChange &&
                this._customHandlers.afterRunnerAtlChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });
            }

            if ($Guards.isRunnerBatbChange (rChange)) {
              log.debug ('runner batb changed');

              this._customHandlers?.beforeRunnerBatbChange &&
                this._customHandlers.beforeRunnerBatbChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });

              this.runnersCache[symbolId].onBatbChange (rChange);

              this._customHandlers?.afterRunnerBatbChange &&
                this._customHandlers.afterRunnerBatbChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });
            }

            if ($Guards.isRunnerBatlChange (rChange)) {
              log.debug ('runner batl changed');

              this._customHandlers?.beforeRunnerBatlChange &&
                this._customHandlers.beforeRunnerBatlChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });

              this.runnersCache[symbolId].onBatlChange (rChange);

              this._customHandlers?.afterRunnerBatlChange &&
                this._customHandlers.afterRunnerBatlChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });
            }

            if ($Guards.isRunnerBdatbChange (rChange)) {
              log.debug ('runner bdatb changed');

              this._customHandlers?.beforeRunnerBdatbChange &&
                this._customHandlers.beforeRunnerBdatbChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });

              this.runnersCache[symbolId].onBdatbChange (rChange);

              this._customHandlers?.afterRunnerBdatbChange &&
                this._customHandlers.afterRunnerBdatbChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });
            }

            if ($Guards.isRunnerBdatlChange (rChange)) {
              log.debug ('runner bdatl changed');

              this._customHandlers?.beforeRunnerBdatlChange &&
                this._customHandlers.beforeRunnerBdatlChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });

              this.runnersCache[symbolId].onBdatlChange (rChange);

              this._customHandlers?.afterRunnerBdatlChange &&
                this._customHandlers.afterRunnerBdatlChange ({
                  msg: rChange,
                  marketsCache: this.marketsCache,
                  runnersByMarketsCache: this.runnersByMarket,
                  runnersCache: this.runnersCache,
                });
            }

            this.runnersCache[symbolId].onChange (rChange);

            this._customHandlers?.afterRunnerChange &&
              this._customHandlers.afterRunnerChange ({
                msg: rChange,
                marketsCache: this.marketsCache,
                runnersByMarketsCache: this.runnersByMarket,
                runnersCache: this.runnersCache,
              });
          }
        }

        this.marketsCache[mChange.id].onChange (mChange as any);

        this._customHandlers?.afterMarketChange &&
          this._customHandlers.afterMarketChange ({
            msg,
            marketsCache: this.marketsCache,
            runnersByMarketsCache: this.runnersByMarket,
            runnersCache: this.runnersCache,
          });
      }
    }
  }

  private _addMarket(i: { marketId: string }) {
    if (!this.marketsCache[i.marketId]) {
      const newMarket = new Market ({ marketId: i.marketId });
      this.marketsCache = {
        ...this.marketsCache,
        [newMarket.id]: newMarket,
      };
    }
  }

  private _addRunner(i: { runnerId: number; marketId: string }) {
    const symbolId = $Utils.toSymbol ({
      runnerId: i.runnerId,
      marketId: i.marketId,
    });
    if (!this.runnersCache[symbolId]) {
      const newRunner = new Runner (i);
      this.runnersCache = {
        ...this.runnersCache,
        [symbolId]: newRunner,
      };

      this.runnersByMarket[i.marketId] = {
        ...this.runnersByMarket[i.marketId],
        [symbolId]: newRunner,
      };
    }
  }
}

/* -------------------------------------------------------------------------- */
/*                               SIDE FUNCTIONS                               */
/* -------------------------------------------------------------------------- */

const log = $Log.log.child ({
  module: 'Betfair',
  sub: 'MarketsSubscription',
});

/* -------------------------------------------------------------------------- */
/*                                CUSTOM TYPES                                */
/* -------------------------------------------------------------------------- */

type RunnersCache = { [symbolId: string]: Runner };

type MarketsCache = { [marketId: string]: Market };

type RunnersByMarketCache = {
  [marketId: string]: {
    [symbolId: string]: Runner;
  };
};

export type CustomHandlers = {
  beforeMarketChange?: (i: {
    msg: Responses;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  afterMarketChange?: (i: {
    msg: Responses;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  beforeRunnerChange?: (i: {
    msg: Responses;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  afterRunnerChange?: (i: {
    msg: Responses;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  beforeRunnerTvChange?: (i: {
    msg: RUNNER_TV_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  afterRunnerTvChange?: (i: {
    msg: RUNNER_TV_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  beforeRunnerTrdChange?: (i: {
    msg: RUNNER_TRD_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  afterRunnerTrdChange?: (i: {
    msg: RUNNER_TRD_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  beforeRunnerLtpChange?: (i: {
    msg: RUNNER_LTP_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  afterRunnerLtpChange?: (i: {
    msg: RUNNER_LTP_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  beforeRunnerSpbChange?: (i: {
    msg: RUNNER_SPB_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  afterRunnerSpbChange?: (i: {
    msg: RUNNER_SPB_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  beforeRunnerSplChange?: (i: {
    msg: RUNNER_SPL_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  afterRunnerSplChange?: (i: {
    msg: RUNNER_SPL_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  beforeRunnerSpnChange?: (i: {
    msg: RUNNER_SPN_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  afterRunnerSpnChange?: (i: {
    msg: RUNNER_SPN_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  beforeRunnerSpfChange?: (i: {
    msg: RUNNER_SPF_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  afterRunnerSpfChange?: (i: {
    msg: RUNNER_SPF_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  beforeRunnerAtbChange?: (i: {
    msg: RUNNER_ATB_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  afterRunnerAtbChange?: (i: {
    msg: RUNNER_ATB_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  beforeRunnerAtlChange?: (i: {
    msg: RUNNER_ATL_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  afterRunnerAtlChange?: (i: {
    msg: RUNNER_ATL_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  beforeRunnerBatbChange?: (i: {
    msg: RUNNER_BATB_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  afterRunnerBatbChange?: (i: {
    msg: RUNNER_BATB_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  beforeRunnerBatlChange?: (i: {
    msg: RUNNER_BATL_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  afterRunnerBatlChange?: (i: {
    msg: RUNNER_BATL_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  beforeRunnerBdatbChange?: (i: {
    msg: RUNNER_BDATB_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  afterRunnerBdatbChange?: (i: {
    msg: RUNNER_BDATB_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  beforeRunnerBdatlChange?: (i: {
    msg: RUNNER_BDATL_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;

  afterRunnerBdatlChange?: (i: {
    msg: RUNNER_BDATL_CHANGE_RESPONSE;
    runnersCache: RunnersCache;
    marketsCache: MarketsCache;
    runnersByMarketsCache: RunnersByMarketCache;
  }) => void;
};
