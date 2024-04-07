import { forwardRef } from 'react';
import classMerge from '@/utils/class-merge';
import type { BlueprintProps } from '@/types/blueprint';

const Blueprint = forwardRef<HTMLDivElement, BlueprintProps>(function Blueprint(
  { className, ...rest },
  ref
) {
  return (
    <div
      data-framer="blueprint"
      className={classMerge('h-full w-full shrink-0 relative overflow-hidden', className)}
      ref={ref}
      {...rest}
    >
      <Cross />
      <Centre />
    </div>
  );
});

export default Blueprint;

function Cross() {
  return (
    <div className="h-full w-full" data-framer="blueprint-cross">
      <svg width="100%" height="100%" viewBox="0 0 789 789" fill="none" preserveAspectRatio="none">
        <g clipPath="url(#clip0_3035_176)">
          <path
            className="fill-grey/20 dark:fill-beige/20"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M789 789L-7.64152e-06 9.91943e-05L0.845306 -0.845215L789.845 788.155L789 789Z"
          />
          <path
            className="fill-grey/20 dark:fill-beige/20"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M789 2.42765e-05L7.64152e-06 789L-0.845306 788.155L788.155 -0.84529L789 2.42765e-05Z"
          />
        </g>
        <defs>
          <clipPath id="clip0_3035_176">
            <rect width="789" height="789" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Centre() {
  return (
    <div className="absolute inset-0 h-full w-full" data-framer="blueprint-centre">
      <div className="absolute inset-0 h-full w-full" data-framer="blueprint-centre-outer">
        <svg
          className="absolute translate-center container"
          width="100%"
          height="100%"
          viewBox="0 0 289 289"
          fill="none"
        >
          <g clipPath="url(#clip0_3224_990)">
            <circle
              className="stroke-grey/20 dark:stroke-beige/20"
              cx="144.052"
              cy="144.052"
              r="143.455"
              strokeWidth="1.19545"
            />
          </g>
          <defs>
            <clipPath id="clip0_3224_990">
              <rect width="288.105" height="288.105" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-0 h-full w-full" data-framer="blueprint-centre-inner">
        <svg
          className="absolute translate-center container"
          width="100%"
          height="100%"
          viewBox="0 0 289 289"
          fill="none"
        >
          <g clipPath="url(#clip0_3224_990)">
            <circle
              className="stroke-grey/20 dark:stroke-beige/20"
              cx="144.098"
              cy="142.902"
              r="98.2158"
              strokeWidth="0.818465"
            />
          </g>
          <defs>
            <clipPath id="clip0_3224_990">
              <rect width="288.105" height="288.105" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
