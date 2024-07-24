import { motion } from 'framer-motion';
import useInteractive from '@/components/pages/index/Hero/fragments/Roles/hooks/interactive';
import useContent from '@/components/pages/index/Hero/hooks/content';
import Trans from '@/components/Trans';
import type { TransComp } from '@/components/Trans/type';
import type { RolesProps, RoleProps } from '@/components/pages/index/Hero/fragments/Roles/type';
import classMerge from '@/utils/classMerge';

const COMPS: TransComp = {
  default: (value, id) => (
    <span key={id} className="text-dynamic-green">
      {value}
    </span>
  ),
};

export default function Roles(props: RolesProps) {
  const { p, rootMotionValue } = props;
  const { roles } = useContent();

  return (
    <div
      className={classMerge(
        'space-y-1 perspective-5000 xl-only:perspective-origin-left lg-540-only:overflow-hidden'
      )}
    >
      {roles.map((role, idx) => (
        <Role {...p} key={role} idx={idx} rootMotionValue={rootMotionValue}>
          {role}
        </Role>
      ))}
    </div>
  );
}

function Role(props: RoleProps) {
  const { style, idx, children, rootMotionValue, ...restProps } = props;
  delete style?.z;
  delete style?.opacity;
  delete style?.filter;
  const interactiveStyle = useInteractive({ rootMotionValue, idx });

  return (
    <motion.p
      {...restProps}
      style={{ ...interactiveStyle, ...style }}
      className={classMerge('trim-helvetiva-neue w-max')}
      id="role"
    >
      <span className="w-[2ch] inline-block">{idx + 1}.</span>
      <Trans string={children} name="hero-role" comps={COMPS} />
    </motion.p>
  );
}
