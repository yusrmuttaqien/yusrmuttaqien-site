import { motion, useTransform } from 'framer-motion';
import useContent from '@/components/pages/index/Hero/hooks/content';
import Trans from '@/components/Trans';
import type { TransComp } from '@/components/Trans/type';
import type { RolesProps, RoleProps } from '@/components/pages/index/Hero/fragments/Roles/type';

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
    <div className="space-y-1 hero-roles perspective-5000 xl-only:perspective-origin-left lg-540-only:overflow-hidden">
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
  // TODO: Move to hooks
  const z = useTransform(rootMotionValue, [0 + (idx * 2) / 10, 1], ['0px', '1000px']);
  const opacity = useTransform(rootMotionValue, [0 + (idx * 2) / 10, 1], [1, 0]);
  const filter = useTransform(
    rootMotionValue,
    [0 + (idx * 2) / 10, 1],
    ['blur(0px)', 'blur(16px)']
  );

  return (
    <motion.p
      {...restProps}
      style={{ z, opacity, filter, ...style }}
      className="trim-helvetiva-neue w-max"
      id="role"
    >
      <Trans string={children} name="hero-role" comps={COMPS} />
    </motion.p>
  );
}
