export default function isTopFold(el: HTMLElement) {
  const { offsetTop, clientHeight } = el;
  const { scrollY } = window;

  return scrollY > offsetTop + clientHeight;
}
