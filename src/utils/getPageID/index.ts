export default function getPageID() {
  return document.querySelector('meta[name="identifier"]')?.getAttribute('content');
}
