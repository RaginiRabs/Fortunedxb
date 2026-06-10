// Mock exchange rates (base = AED). Prototype 4 only — not live rates.
export const CURRENCIES = [
  { code: 'AED', symbol: 'AED', rate: 1 },
  { code: 'USD', symbol: '$', rate: 0.2723 },
  { code: 'INR', symbol: '₹', rate: 22.9 },
];

export function formatMoney(aedAmount, cur) {
  const v = aedAmount * cur.rate;
  if (cur.code === 'INR') {
    if (v >= 10000000) return `₹ ${(v / 10000000).toFixed(2)} Cr`;
    if (v >= 100000) return `₹ ${(v / 100000).toFixed(2)} L`;
    return `₹ ${Math.round(v).toLocaleString('en-IN')}`;
  }
  const sep = cur.symbol.length > 1 ? ' ' : '';
  return `${cur.symbol}${sep}${Math.round(v).toLocaleString('en-US')}`;
}

// short form e.g. AED 1.9M / $0.5M
export function formatMoneyShort(aedAmount, cur) {
  const v = aedAmount * cur.rate;
  if (cur.code === 'INR') {
    return v >= 10000000 ? `₹ ${(v / 10000000).toFixed(1)} Cr` : `₹ ${(v / 100000).toFixed(1)} L`;
  }
  const sep = cur.symbol.length > 1 ? ' ' : '';
  return `${cur.symbol}${sep}${(v / 1000000).toFixed(2)}M`;
}
