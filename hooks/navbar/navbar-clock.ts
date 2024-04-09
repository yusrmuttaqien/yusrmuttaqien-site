import { useState } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';

export default function useNavbarClock() {
  const [time, setTime] = useState({ hour: ['0', '0'], minute: ['0', '0'] });

  useIsomorphicLayoutEffect(() => {
    function update() {
      setTime(GetDate());

      requestAnimationFrame(update);
    }

    update();
  }, []);

  return time;
}

function GetDate() {
  const formatedDate = new Intl.DateTimeFormat('id-ID', {
    timeStyle: 'long',
  }).format(new Date());
  const splitedDate = formatedDate.split('.');

  function splitDigit(digits: string) {
    return digits.split('').map((digit) => digit);
  }

  return {
    hour: splitDigit(splitedDate[0]),
    minute: splitDigit(splitedDate[1]),
  };
}
