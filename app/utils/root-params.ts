import { pageContext } from '@sodefa/next-server-context';

export default function PageWithRootParams(childFn: () => JSX.Element) {
  return pageContext.Wrapper(childFn);
}

export function getRootParams() {
  return pageContext.getOrThrow();
}
