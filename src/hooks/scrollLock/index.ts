import { useLenis } from '@studio-freight/react-lenis';

const LOCK_ATTR = 'data-lockers';

export default function useScrollLock() {
  const lenis = useLenis();

  function _lock(id: string, isInitial?: boolean) {
    const body = document.body;
    const locked = _setLocker(id);

    if (locked) {
      if (isInitial) {
        body.setAttribute('data-lenis-prevent', 'true');
        body.classList.add('overflow-hidden');
      } else {
        lenis?.stop();
      }
    }
  }
  function _unlock(id: string, isInitial?: boolean) {
    const body = document.body;
    const unlocked = _unsetLocker(id);

    if (unlocked) {
      if (isInitial) {
        body.removeAttribute('data-lenis-prevent');
        body.classList.remove('overflow-hidden');
      } else {
        lenis?.start();
      }
    }
  }
  function _getLockers(): Array<string> {
    const html = document.documentElement;
    const lockers = html.getAttribute(LOCK_ATTR) || '[]';

    return JSON.parse(lockers);
  }
  function _unsetLocker(id: string) {
    const html = document.documentElement;
    const lockers = _getLockers();
    const newLockers = lockers.filter((locker) => locker !== id);

    html.setAttribute('locker', JSON.stringify(newLockers));
    return newLockers.length === 0;
  }
  function _setLocker(id: string) {
    const html = document.documentElement;
    const lockers = _getLockers();

    !lockers.some((locker) => locker === id) && lockers.push(id);
    html.setAttribute('locker', JSON.stringify(lockers));
    return lockers.length <= 1;
  }

  return { lock: _lock, unlock: _unlock };
}
