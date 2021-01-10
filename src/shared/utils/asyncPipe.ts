type MaybePromise<T> = Promise<T> | T;

function asyncPipe<A, B>(
  ab: (a: A) => MaybePromise<B>
): (a: MaybePromise<A>) => Promise<B>;
function asyncPipe<A, B, C>(
  ab: (a: A) => MaybePromise<B>,
  bc: (b: B) => MaybePromise<C>
): (a: MaybePromise<A>) => Promise<C>;

function asyncPipe(...fns: Function[]) {
  return (x: any) => fns.reduce (async (y, fn) => fn (await y), x);
}
