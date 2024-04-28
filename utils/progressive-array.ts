import type { ProgressiveArray } from '@/types/utils';

export default function progressiveArray(props: ProgressiveArray) {
  const { steps, rangeEnd } = props;
  const result: number[] = [0];
  const increment = rangeEnd / steps;

  for (let i = 1; i <= steps; i++) {
    const prevNum = i === 0 ? 0 : result[i - 1];

    result.push(prevNum + increment);
  }

  return result;
}
