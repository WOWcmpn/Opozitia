export function formatCurrencyDate(date: string) {
  const arr = date.split('');
  arr.splice(-4, 2);
  return arr.join('');
}
