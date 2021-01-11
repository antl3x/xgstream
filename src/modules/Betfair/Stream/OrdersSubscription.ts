import fs from 'fs';
import path from 'path';
import { createMarket } from '@modules/Betfair/Market/Market';
import { LogService } from '@shared/services/LogService';
import {
  OrdersCache,
  OrdersSubscriptionMiddleware,
  StreamMessageOrderChange,
} from '@modules/Betfair';

type OrdersSubscriptionProps<MiddlewareCache> = {
  customMiddleware?: OrdersSubscriptionMiddleware<MiddlewareCache>;
};

export interface OrdersSubscription {
  initialClk: () => string;
  clk: () => string;
  conflateMs: () => number;
  heartbeatMs: () => number;
  messagesReceived: () => number;
  lastPublishTime: () => Date;
  onOrderChangeMessage: (msg: StreamMessageOrderChange) => void;
}

export const createOrdersSubscription = <MiddlewareCache = {}>(
  props: OrdersSubscriptionProps<MiddlewareCache>
): OrdersSubscription => {
  const log = LogService.child ({
    module: 'Betfair',
    sub: 'OrdersSubscription',
  });

  let messagesReceived = 0;
  let initialClk: string;
  let clk: string;
  let conflateMs: number;
  let heartbeatMs: number;
  let lastPublishTime: Date;
  let middlewareCache: MiddlewareCache;

  function onOrderChangeMessage(mChange: StreamMessageOrderChange) {
    lastPublishTime = new Date (mChange.pt);
    initialClk = mChange.initialClk;
    clk = mChange.clk;
    conflateMs = mChange.conflateMs || 0;
    heartbeatMs = mChange.heartbeatMs;
    messagesReceived++;

    const changeType = mChange.ct || 'SUB_IMAGE';

    // if (changeType === 'SUB_IMAGE') {
    //   _runMiddleware (mChange, 'beforeSubImageReceived');
    //   _onSubImageReceived (mChange);
    //   _runMiddleware (mChange, 'afterSubImageReceived');
    // }

    // if (changeType === 'RESUB_DELTA') {
    //   _runMiddleware (mChange, 'beforeReSubImageReceived');
    //   _onResubImageReceived (mChange);
    //   _runMiddleware (mChange, 'afterReSubImageReceived');
    // }
    // if (changeType === 'HEARTBEAT') {
    //   _runMiddleware (mChange, 'beforeHeartbeatReceived');
    //   _onHeartbeatReceived (mChange);
    //   _runMiddleware (mChange, 'afterHeartbeatReceived');
    // }
  }

  function _onSubImageReceived(msg: StreamMessageOrderChange) {
    // if (msg.mc) {
    //   for (const mChange of msg.mc) {
    //     const marketId = mChange.id;
    //     if (props.enableOrdersRecording) {
    //       _recordMarketMessage ({ marketId, msg, mChange });
    //     }
    //     if (mChange.marketDefinition && mChange.img) {
    //       OrdersCache[marketId] = createMarket ({
    //         id: marketId,
    //         marketDefinition: mChange.marketDefinition,
    //         matchedTotal: mChange.tv,
    //         runnersChanges: mChange.rc,
    //       });
    //     }
    //     if (!mChange.img) {
    //       OrdersCache[marketId].updateCache (mChange);
    //     }
    //     if (mChange.marketDefinition?.status === 'CLOSED') {
    //       delete OrdersCache[marketId];
    //     }
    //   }
    //   log.info (`updated ${msg.mc.length} Orders on the cache`);
    // }
  }

  function _onResubImageReceived(msg: StreamMessageOrderChange) {
    log.debug (`resubscription message received`);
  }

  function _onHeartbeatReceived(msg: StreamMessageOrderChange) {
    log.debug (`heartbeat message received`);
  }

  //   function _runMiddleware(
  //     mChange: StreamMessageOrderChange,
  //     name: keyof OrdersSubscriptionMiddleware<MiddlewareCache>
  //   ) {
  //     middlewareCache =
  //       props?.customMiddleware?.[name]?.({
  //         OrdersCache,
  //         middlewareCache,
  //         mChange,
  //       }) || middlewareCache;
  //   }

  //   function _recordMarketMessage(i: {
  //     marketId: string;
  //     mChange: StreamMessageOrderChange['mc'][0];
  //     msg: StreamMessageOrderChange;
  //   }) {
  //     OrdersFileStreams[i.marketId] =
  //       OrdersFileStreams[i.marketId] ||
  //       _createWriteStream ({
  //         marketId: i.marketId,
  //         eventId: i.mChange.marketDefinition?.eventId || 'UNK',
  //         eventTypeId: i.mChange.marketDefinition?.eventTypeId || 'UNK',
  //         marketTime: i.mChange.marketDefinition?.marketTime || 'UNK',
  //       });

  //     const fileStream = OrdersFileStreams[i.marketId];

  //     fileStream.write (`${JSON.stringify (i.mChange)}\r\n`, 'utf-8');
  //   }

  //   function _createWriteStream(i: {
  //     marketTime: string;
  //     eventTypeId: number | string;
  //     eventId: string;
  //     marketId: string;
  //   }) {
  //     const eventDate = new Date (i.marketTime);
  //     const eventYear = eventDate.getFullYear ();
  //     const eventMonth = eventDate.getMonth () + 1;
  //     const eventDay = eventDate.getDate ();
  //     const fileName = `${i.eventTypeId}-${eventYear}-${eventMonth}-${eventDay}-${i.eventId}-${i.marketId}`;
  //     const customFolderPath = props.enableOrdersRecording?.folderPath || '';
  //     const folderPath = path.join (process.cwd (), customFolderPath);
  //     const filePath = path.join (folderPath, fileName);

  //     fs.mkdir (folderPath, { recursive: true }, (err) => {
  //       if (err) throw err;
  //     });

  //     return fs.createWriteStream (filePath);
  //   }

  return {
    initialClk: () => initialClk,
    clk: () => clk,
    conflateMs: () => conflateMs,
    heartbeatMs: () => heartbeatMs,
    messagesReceived: () => messagesReceived,
    lastPublishTime: () => lastPublishTime,
    onOrderChangeMessage,
  };
};
