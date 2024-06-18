export default function isTopFold(el: HTMLElement) {
  if (!el) return false;

  const { offsetTop, clientHeight } = el;
  const { scrollY } = window;

  return scrollY > offsetTop + clientHeight;
}
