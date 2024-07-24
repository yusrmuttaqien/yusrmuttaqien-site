export default function getTime() {
  const formatedTime = new Intl.DateTimeFormat('id-ID', {
    timeStyle: 'long',
    timeZone: '+07',
  }).format(new Date());
  const splitedTime = formatedTime.split('.');

  function _splitDigit(digits: string) {
    return digits.split('').map((digit) => digit);
  }

  return {
    hour: _splitDigit(splitedTime[0]),
    minute: _splitDigit(splitedTime[1]),
    second: _splitDigit(splitedTime[2].split(' ')[0]),
  };
}
