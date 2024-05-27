import type { AllEqual } from '@/components/Navbar/fragments/Clock/type';

export default function allEqual(param: AllEqual) {
  const { arr1, arr2 } = param;

  return arr1.every((value, index) => value === arr2[index]);
}
