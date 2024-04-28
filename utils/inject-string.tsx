import { Fragment } from 'react';
import type { InjectStringProps } from '@/types/utils';

export default function InjectString(props: InjectStringProps) {
  const { comps = {}, string, name, classNames = {} } = props;
  const { strings, injectables } = _parse();

  function _parse() {
    const identifyIdx = string.split('<');
    let parsedStrings: string[] = [];
    let injectableIdx: number[] = [];
    let offset = 0;

    identifyIdx.forEach((v, idx) => {
      if (!v.includes('>')) {
        return parsedStrings.push(v);
      }
      const afterInject = v.split('>');

      injectableIdx.push(idx + offset);
      parsedStrings.push(afterInject[0]);
      parsedStrings.push(afterInject[1]);

      offset++;
    });

    return { strings: parsedStrings, injectables: injectableIdx };
  }

  return (
    <Fragment>
      {strings.map((str, idx) => {
        const isInjectable = injectables.includes(idx);
        const id = `${name}-${idx}`;

        return isInjectable ? (
          <Fragment key={id}>{comps[str]}</Fragment>
        ) : (
          <span key={id} id={id} className={classNames[id]} data-framer={id}>
            {str}
          </span>
        );
      })}
    </Fragment>
  );
}
