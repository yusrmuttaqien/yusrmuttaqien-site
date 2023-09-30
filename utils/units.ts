const isString = (val: any): val is string => typeof val === 'string' || val instanceof String;

export function withPx(num: number | string) {
  return isString(num) ? `${num}px` : `${num.toString()}px`;
}
