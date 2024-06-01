export default function getDate() {
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
    second: _splitDigit(splitedDate[2].split(' ')[0]),
  };
}
