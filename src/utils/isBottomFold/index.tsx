export default function isBottomFold(el: HTMLElement) {
  if (!el) return false;

  const { top, height } = el.getBoundingClientRect();
  const { scrollY, innerHeight } = window;

  return scrollY + innerHeight < top + height;
}
