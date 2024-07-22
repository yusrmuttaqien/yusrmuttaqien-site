export default function isTopFold(el: HTMLElement) {
  if (!el) return false;

  const { top, height } = el.getBoundingClientRect();
  const { scrollY } = window;

  return scrollY > scrollY + top + height;
}
