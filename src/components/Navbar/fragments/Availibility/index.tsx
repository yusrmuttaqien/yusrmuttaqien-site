// TODO: Add devtools & api handler to change availibility status
import { tv } from 'tailwind-variants';
import useContent from '@/components/Navbar/hooks/content';
import type { AvailibilityProps } from '@/components/Navbar/fragments/Availibility/type';

export const AVAILIBILITY_STYLES = tv({
  slots: {
    background: 'bg-dynamic-green p-[0.625rem]',
    text: 'text-beige trim-helvetiva-neue text-center',
  },
});

export default function Availibility(props: AvailibilityProps) {
  const { className } = props;
  const { available } = useContent();
  const { background, text } = AVAILIBILITY_STYLES();

  return (
    <div id="availibility" className={background({ className: className?.background })}>
      <p className={text({ className: className?.text })}>{available}</p>
    </div>
  );
}
