import { StreamMessageMarketChange } from '.';

export type Subscription = MarketSubscription | OrderSubscription;

export interface MarketSubscription {
  initialClk: string;
  clk: string;
  conflateMs: number;
  heartbeatMs: number;
  messagesReceived: number;
  onSubImageReceived: (msg: StreamMessageMarketChange) => void;
  onReSubImageReceived: (msg: StreamMessageMarketChange) => void;
  onHeartbeatReceived: (msg: StreamMessageMarketChange) => void;
  onDeltaReceived: (msg: StreamMessageMarketChange) => void;
}

interface OrderSubscription {
  messagesReceived: number;
}
