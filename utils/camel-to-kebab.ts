import { CamelToKebabCase } from '@/types/utils';

export default function camelToKebabCase(str: CamelToKebabCase) {
  return str
    .split('')
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter;
    })
    .join('');
}
