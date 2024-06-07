import useContent from '@/components/Hero/hooks/content';
import Trans from '@/components/Trans';
import type { TransComp } from '@/components/Trans/type';

const COMPS: TransComp = {
  default: (value, id) => (
    <span key={id} className="text-dynamic-green">
      {value}
    </span>
  ),
};

export default function Roles() {
  const { roles } = useContent();

  return (
    <div className="space-y-1 hero-roles">
      {roles.map((role) => (
        <p key={role} className="trim-helvetiva-neue" id="role">
          <Trans string={role} name="hero-role" comps={COMPS} />
        </p>
      ))}
    </div>
  );
}
