export type CounterId = number;

// Keep a single in-memory store across HMR in development
const globalForCounter = globalThis as unknown as {
  __counterStore?: Map<CounterId, number>;
};

const store: Map<CounterId, number>
  = globalForCounter.__counterStore ?? new Map<CounterId, number>();

if (!globalForCounter.__counterStore) {
  globalForCounter.__counterStore = store;
}

export function getCount(id: CounterId): number {
  return store.get(id) ?? 0;
}

export function incrementCount(id: CounterId, delta: number): number {
  const previous = store.get(id) ?? 0;
  const next = previous + delta;
  store.set(id, next);
  return next;
}
