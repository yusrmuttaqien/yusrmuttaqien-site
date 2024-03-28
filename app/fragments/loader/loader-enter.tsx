import Script from 'next/script';
import classMerge from '@/app/utils/class-merge';
import { ID_LOADER_PERCENT, ID_LOADER_ENTER } from '@/app/constants/loader';

export default function LoaderEnter() {
  return (
    <div id={ID_LOADER_ENTER} className="fixed inset-0 z-[102] bg-beige dark:bg-grey">
      <div className="container container-b w-full h-full flex items-end justify-end">
        <p
          id={ID_LOADER_PERCENT}
          className={classMerge(
            'font-roboto-mono select-none animate-pulse overflow-hidden before:table after:table before:mb-[-0.2107em] after:mt-[-0.1448em]',
            'text-[clamp(2.9769rem,_0.0005rem_+_14.8818vw,_4rem)] md:text-[clamp(4rem,_1.6052rem_+_8.9109vw,_6.25rem)]'
          )}
          suppressHydrationWarning
        >
          0
        </p>
      </div>
      <Script strategy="beforeInteractive" id={ID_LOADER_PERCENT + '-script'}>
        {`  const loaderPercentEl = document.getElementById('id-loader-percent');
            let currentValue = 0;
            const targetValue = 80;
            const duration = 75000; // in ms
            const speed = 100; // in ms
            const increment = (targetValue - currentValue) / (duration / speed);

            window.ymLoader = setInterval(() => {
                currentValue += increment;
                loaderPercentEl.innerText = Math.round(currentValue);
                
                if (currentValue >= targetValue) {
                    clearInterval(window.ymLoader);
                }
            }, speed);
        `}
      </Script>
    </div>
  );
}
