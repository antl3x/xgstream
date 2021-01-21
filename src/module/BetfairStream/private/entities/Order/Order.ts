import { StreamMessageOrderChange } from '@private/BetfairStream';

type OrderProps = {
  id: string;
};

export interface Order {
  id: () => string;
  updateCache: (msg: StreamMessageOrderChange) => void;
}

export const createOrder = (props: OrderProps): Order => {
  function _init() {
    console.log (props);
  }

  function updateCache(mChange: StreamMessageOrderChange) {}

  _init ();
  return {
    id: () => props.id,
    updateCache,
  };
};
