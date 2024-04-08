export default function gFD(name: string, specifier?: string) {
  return `[data-framer="${name}"]` + (specifier ? ` ${specifier}` : '');
}
