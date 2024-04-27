import { useState } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';

export default function useNavbarClock() {
  const [time, setTime] = useState({ hour: ['0', '0'], minute: ['0', '0'] });

  useIsomorphicLayoutEffect(() => {
    function _update() {
      setTime(getDate());
      requestAnimationFrame(_update);
    }

    _update();
  }, []);

  return time;
}

function getDate() {
  const formatedDate = new Intl.DateTimeFormat('id-ID', {
    timeStyle: 'long',
  }).format(new Date());
  const splitedDate = formatedDate.split('.');

  function _splitDigit(digits: string) {
    return digits.split('').map((digit) => digit);
  }

  return {
    hour: _splitDigit(splitedDate[0]),
    minute: _splitDigit(splitedDate[1]),
  };
}
