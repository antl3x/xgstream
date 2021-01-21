import fs from 'fs';
import path from 'path';
import {
  MarketsSubscriptionMiddleware,
  StreamMessageMarketChange,
  MarketsCache,
  createMarket,
} from '@private/BetfairStream';
import { logChild } from '@module/Log';

export type Subscription = MarketsSubscription | OrderSubscription;

type MarketsSubscriptionRecorders = {
  [marketId: string]: fs.WriteStream;
};

type MarketsSubscriptionProps<MiddlewareCache> = {
  customMiddleware?: MarketsSubscriptionMiddleware<MiddlewareCache>;
  enableMarketsRecording?: {
    folderPath: string;
  };
};

export interface MarketsSubscription {
  initialClk: () => string;
  clk: () => string;
  conflateMs: () => number;
  heartbeatMs: () => number;
  messagesReceived: () => number;
  lastPublishTime: () => Date;
  onMarketChangeMessage: (msg: StreamMessageMarketChange) => void;
  marketsCache: () => MarketsCache;
}

export const createMarketsSubscription = <MiddlewareCache = {}>(
  props: MarketsSubscriptionProps<MiddlewareCache>
): MarketsSubscription => {
  const log = logChild ({
    module: 'Betfair',
    sub: 'MarketsSubscription',
  });

  let messagesReceived = 0;
  let initialClk: string;
  let clk: string;
  let conflateMs: number;
  let heartbeatMs: number;
  let lastPublishTime: Date;
  let middlewareCache: MiddlewareCache;
  const marketsCache: MarketsCache = {};
  const marketsFileStreams: MarketsSubscriptionRecorders = {};

  function onMarketChangeMessage(mChange: StreamMessageMarketChange) {
    lastPublishTime = new Date (mChange.pt);
    initialClk = mChange.initialClk;
    clk = mChange.clk;
    conflateMs = mChange.conflateMs || 0;
    heartbeatMs = mChange.heartbeatMs;
    messagesReceived++;

    const changeType = mChange.ct || 'SUB_IMAGE';

    if (changeType === 'SUB_IMAGE') {
      _runMiddleware (mChange, 'beforeSubImageReceived');
      _onSubImageReceived (mChange);
      _runMiddleware (mChange, 'afterSubImageReceived');
    }

    if (changeType === 'RESUB_DELTA') {
      _runMiddleware (mChange, 'beforeReSubImageReceived');
      _onResubImageReceived (mChange);
      _runMiddleware (mChange, 'afterReSubImageReceived');
    }
    if (changeType === 'HEARTBEAT') {
      _runMiddleware (mChange, 'beforeHeartbeatReceived');
      _onHeartbeatReceived (mChange);
      _runMiddleware (mChange, 'afterHeartbeatReceived');
    }
  }

  function _onSubImageReceived(msg: StreamMessageMarketChange) {
    if (msg.mc) {
      for (const mChange of msg.mc) {
        const marketId = mChange.id;

        if (props.enableMarketsRecording) {
          _recordMarketMessage ({ marketId, msg, mChange });
        }

        if (mChange.marketDefinition && mChange.img) {
          marketsCache[marketId] = createMarket ({
            id: marketId,
            marketDefinition: mChange.marketDefinition,
            matchedTotal: mChange.tv,
            runnersChanges: mChange.rc,
          });
        }

        if (!mChange.img) {
          marketsCache[marketId].updateCache (mChange);
        }

        if (mChange.marketDefinition?.status === 'CLOSED') {
          delete marketsCache[marketId];
        }
      }
      log.info (`updated ${msg.mc.length} markets on the cache`);
    }
  }

  function _onResubImageReceived(msg: StreamMessageMarketChange) {
    log.debug (`resubscription message received`);
  }

  function _onHeartbeatReceived(msg: StreamMessageMarketChange) {
    log.debug (`heartbeat message received`);
  }

  function _runMiddleware(
    mChange: StreamMessageMarketChange,
    name: keyof MarketsSubscriptionMiddleware<MiddlewareCache>
  ) {
    middlewareCache =
      props?.customMiddleware?.[name]?.({
        marketsCache,
        middlewareCache,
        mChange,
      }) || middlewareCache;
  }

  function _recordMarketMessage(i: {
    marketId: string;
    mChange: StreamMessageMarketChange['mc'][0];
    msg: StreamMessageMarketChange;
  }) {
    marketsFileStreams[i.marketId] =
      marketsFileStreams[i.marketId] ||
      _createWriteStream ({
        marketId: i.marketId,
        eventId: i.mChange.marketDefinition?.eventId || 'UNK',
        eventTypeId: i.mChange.marketDefinition?.eventTypeId || 'UNK',
        marketTime: i.mChange.marketDefinition?.marketTime || 'UNK',
      });

    const fileStream = marketsFileStreams[i.marketId];

    fileStream.write (`${JSON.stringify (i.mChange)}\r\n`, 'utf-8');
  }

  function _createWriteStream(i: {
    marketTime: string;
    eventTypeId: number | string;
    eventId: string;
    marketId: string;
  }) {
    const eventDate = new Date (i.marketTime);
    const eventYear = eventDate.getFullYear ();
    const eventMonth = eventDate.getMonth () + 1;
    const eventDay = eventDate.getDate ();
    const fileName = `${i.eventTypeId}-${eventYear}-${eventMonth}-${eventDay}-${i.eventId}-${i.marketId}`;
    const customFolderPath = props.enableMarketsRecording?.folderPath || '';
    const folderPath = path.join (process.cwd (), customFolderPath);
    const filePath = path.join (folderPath, fileName);

    fs.mkdir (folderPath, { recursive: true }, (err) => {
      if (err) throw err;
    });

    return fs.createWriteStream (filePath);
  }

  return {
    initialClk: () => initialClk,
    clk: () => clk,
    conflateMs: () => conflateMs,
    heartbeatMs: () => heartbeatMs,
    messagesReceived: () => messagesReceived,
    lastPublishTime: () => lastPublishTime,
    marketsCache: () => marketsCache,
    onMarketChangeMessage,
  };
};

interface OrderSubscription {
  messagesReceived: number;
}
