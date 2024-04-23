import { motion } from 'framer-motion';
import classMerge from '@/utils/class-merge';
import type {
  HeroBlueprintProps,
  HeroBlueprintCrossProps,
  HeroBlueprintCentreProps,
} from '@/types/home';

export default function HomeHeroBlueprint(props: HeroBlueprintProps) {
  const { className, framerStyles, ...rest } = props;

  return (
    <div
      className={classMerge('h-full w-full shrink-0 relative overflow-hidden', className)}
      {...rest}
    >
      <Cross framerStyles={framerStyles.cross} />
      <Centre framerStyles={framerStyles.centre} />
    </div>
  );
}

function Cross(props: HeroBlueprintCrossProps) {
  const { framerStyles } = props;

  return (
    <motion.div className="h-full w-full" data-framer="blueprint-cross" style={framerStyles}>
      <svg width="100%" height="100%" viewBox="0 0 789 789" fill="none" preserveAspectRatio="none">
        <g clipPath="url(#clip0_3035_176)">
          <path
            className="fill-grey-dynamic-[20]"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M789 789L-7.64152e-06 9.91943e-05L0.845306 -0.845215L789.845 788.155L789 789Z"
          />
          <path
            className="fill-grey-dynamic-[20]"
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
    </motion.div>
  );
}

function Centre(props: HeroBlueprintCentreProps) {
  const { framerStyles } = props;

  return (
    <motion.div
      className="absolute inset-0"
      data-framer="blueprint-centre"
      style={framerStyles.root}
    >
      <motion.div
        className="absolute inset-0"
        data-framer="blueprint-centre-outer"
        style={framerStyles.outer}
      >
        <svg className="w-full h-full" viewBox="0 0 289 289" fill="none">
          <g clipPath="url(#clip0_3224_990)">
            <circle
              className="stroke-grey-dynamic-[30]"
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
      </motion.div>
      <motion.div className="absolute inset-0" data-framer="blueprint-centre-inner">
        <svg className="w-full h-full" viewBox="0 0 289 289" fill="none">
          <g clipPath="url(#clip0_3224_990)">
            <circle
              className="stroke-grey-dynamic-[30]"
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
      </motion.div>
    </motion.div>
  );
}
