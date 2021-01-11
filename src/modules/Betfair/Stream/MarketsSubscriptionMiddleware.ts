import { MarketsCache, StreamMessageMarketChange } from '@modules/Betfair';

export interface MarketsSubscriptionMiddleware<MiddlewareCache> {
  beforeSubImageReceived?: (i: {
    marketsCache: MarketsCache;
    middlewareCache: MiddlewareCache;
    mChange: StreamMessageMarketChange;
  }) => MiddlewareCache;

  afterSubImageReceived?: (i: {
    marketsCache: MarketsCache;
    middlewareCache: MiddlewareCache;
    mChange: StreamMessageMarketChange;
  }) => MiddlewareCache;

  beforeReSubImageReceived?: (i: {
    marketsCache: MarketsCache;
    middlewareCache: MiddlewareCache;
    mChange: StreamMessageMarketChange;
  }) => MiddlewareCache;

  afterReSubImageReceived?: (i: {
    marketsCache: MarketsCache;
    middlewareCache: MiddlewareCache;
    mChange: StreamMessageMarketChange;
  }) => MiddlewareCache;

  beforeHeartbeatReceived?: (i: {
    marketsCache: MarketsCache;
    middlewareCache: MiddlewareCache;
    mChange: StreamMessageMarketChange;
  }) => MiddlewareCache;

  afterHeartbeatReceived?: (i: {
    marketsCache: MarketsCache;
    middlewareCache: MiddlewareCache;
    mChange: StreamMessageMarketChange;
  }) => MiddlewareCache;
}
