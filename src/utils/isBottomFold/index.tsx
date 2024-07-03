export default function isBottomFold(el: HTMLElement) {
  if (!el) return false;

  const { offsetTop, clientHeight } = el;
  const { scrollY, innerHeight } = window;

  return scrollY + innerHeight < offsetTop + clientHeight;
}
