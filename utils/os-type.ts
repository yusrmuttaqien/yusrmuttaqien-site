export default function osType() {
  const isMac = navigator.userAgent.toUpperCase().indexOf('MAC') >= 0 || false;

  return isMac ? 'mac' : 'pc';
}
