export default function progressiveArray(steps: number, rangeEnd: number) {
  const result: number[] = [0];
  const increment = rangeEnd / steps;

  for (let i = 1; i <= steps; i++) {
    const prevNum = i === 0 ? 0 : result[i - 1];

    result.push(prevNum + increment);
  }

  return result;
}
