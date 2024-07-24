import type { ArrEqualParams } from '@/utils/arrEqual/type';

export default function arrEqual(params: ArrEqualParams) {
  const { arr1, arr2 } = params;

  if (!arr1 || !arr2) return false;

  return arr1.every((value, index) => value === arr2[index]);
}
