export const calculateVwap = (...p: any[]) => {
  if (p.length === 1 && Array.isArray (p[0])) p = p[0];
  if (!p.length) return 0;
  // formula: sum(num shares * share price)/(total shares)
  return (
    p.reduce ((s, x) => s + x[0] * x[1], 0) / p.reduce ((s, x) => s + x[0], 0) ||
    0
  );
};

export const roundToDecimal = (i: number) => Math.round (i * 100) / 100;

export const calcTickChange = (oldValue: number, newValue: number) => {
  const tickSizes = [
    [1, 2, 0.01],
    [2, 3, 0.02],
    [3, 4, 0.05],
    [4, 6, 0.1],
    [6, 10, 0.2],
    [10, 20, 0.5],
    [20, 30, 1],
    [30, 50, 2],
    [50, 100, 5],
    [100, 1000, 1],
  ];

  if (newValue === 0 || oldValue === 0) return 0;

  return tickSizes.reduce ((pV, cV) => {
    if (newValue > cV[0] && newValue <= cV[1]) {
      return (newValue - oldValue) / cV[2];
    }
    return pV;
  }, 0);
};

export const toSymbol = (i: { runnerId: number; marketId: string }) => {
  return `${i.runnerId.toString ()}-${i.marketId.replace ('.', '')}`;
};
