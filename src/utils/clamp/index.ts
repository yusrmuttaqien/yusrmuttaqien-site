import type { Clamp } from '@/utils/clamp/type';

/**
 * Calculate the clamped value based on the min and max values and the min and max viewports.
 * Returns string of CSS clamp function.
 * Params unit is in pixels.
 */
export default function clamp(param: Clamp): string {
  const { minValue, maxValue, minViewport, maxViewport, baseFontSize = 16 } = param;
  const preferredViewport = 100 * ((maxValue - minValue) / (maxViewport - minViewport));
  const preferredRelative =
    (minViewport * maxValue - maxViewport * minValue) / (minViewport - maxViewport);
  const relativeRem = preferredRelative / baseFontSize;
  const minValueRem = minValue / baseFontSize;
  const maxValueRem = maxValue / baseFontSize;

  return `clamp(${minValueRem}rem, ${relativeRem}rem + ${preferredViewport}vw, ${maxValueRem}rem)`;
}
