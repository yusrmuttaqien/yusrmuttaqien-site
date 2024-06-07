import { Fragment } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { TransProps } from '@/components/Trans/type';

export default function Trans<T>(props: T & TransProps<T>) {
  const { comps = {}, string, name, classNames = {}, withPresence = false, ...rest } = props;
  const { strings, injectables } = _parse();
  const Wrapper = withPresence ? AnimatePresence : Fragment;

  function _parse() {
    const firstIdx = string.split('<');
    let parsedStrings: string[] = [];
    let injectableIdx: number[] = [];
    let offset = 0;

    firstIdx.forEach((value, index) => {
      if (!value.includes('>')) return parsedStrings.push(value);
      const afterInject = value.split('>');

      injectableIdx.push(index + offset);
      parsedStrings.push(afterInject[0]);
      parsedStrings.push(afterInject[1]);

      offset++;
    });
    parsedStrings.forEach((value, index) => {
      if (value !== '') return;

      injectableIdx.forEach((idx, idxIndex) => {
        if (idx < index) return;

        injectableIdx[idxIndex] = idx - 1;
      });
    });

    parsedStrings = parsedStrings.filter((value) => value !== '');

    return { strings: parsedStrings, injectables: injectableIdx };
  }

  return (
    <Wrapper {...rest}>
      {strings.map((str, idx) => {
        const isInjectable = injectables.includes(idx);
        const id = `${name}-${idx}`;
        const [key, value] = str.includes('\\') ? str.split('\\') : [str, str];
        const renderer = comps[key] || comps.default;

        return isInjectable && renderer ? (
          renderer(value, id)
        ) : (
          <span key={id} id={id} className={classNames[id]}>
            {str}
          </span>
        );
      })}
    </Wrapper>
  );
}
