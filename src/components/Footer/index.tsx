// TODO: Add entry animation and skip when off the viewport
import { Fragment } from 'react';
import { tv } from 'tailwind-variants';
import { motion } from 'framer-motion';
import { useLongPress } from '@/hooks/longPress';
import useContent from '@/components/Footer/hooks/content';
import useInteractive from '@/components/Footer/hooks/interactive';
import Link from '@/components/Link';
import Trans from '@/components/Trans';
import Marquee from '@/components/Marquee';
import Yusr from '@/components/Footer/fragments/Yusr';
import SectionBox from '@/components/SectionBox';
import { EMAIL } from '@/components/Footer/constant';
import type { FooterProps } from '@/components/Footer/type';
import type { TransComp } from '@/components/Trans/type';

const COMPS: TransComp = {
  default: (value, id) => (
    <span key={id} className="text-dynamic-green">
      {value}
    </span>
  ),
};

export const FOOTER_STYLES = tv({
  slots: {
    contact: 'relative bg-dynamic-grey block py-2',
    footer: '-mt-[100svh] isolate',
  },
});
export default function Footer(props: FooterProps) {
  const { className } = props;
  const { scope, filterBrightness } = useInteractive();
  const { contact, footer } = FOOTER_STYLES();
  const handlers = useLongPress({ onFinish: _copyEmail });
  const {
    internetsTitle,
    contact: tContact,
    emailCopied,
    internets,
    createdAt,
    createdAtDesc,
    createdWith,
    createdWithDesc,
  } = useContent();

  function _copyEmail() {
    // TODO: Change feedback to cursor
    try {
      navigator.clipboard.writeText(EMAIL).then(() => alert(emailCopied));
    } catch (e) {
      alert(e);
    }
  }

  return (
    <Fragment>
      <Link
        id="footer-contact"
        href={`mailto:${EMAIL}`}
        look="custom"
        {...handlers}
        className={{ link: { a: contact({ className: className?.contact }) } }}
      >
        <Marquee name="contact" className={{ wrapper: 'flex gap-2' }}>
          <p className="trim-helvetiva-neue font-bold text-dynamic-beige text-clamp-[14_16_320_540]">
            {tContact}
          </p>
        </Marquee>
      </Link>
      <div ref={scope} className={footer({ className: className?.footer })}>
        <div className="h-[100svh] w-full block bg-dynamic-beige z-10 relative" />
        <motion.footer
          className="sticky bottom-0 z-0 overflow-hidden"
          style={{ filter: filterBrightness }}
        >
          <div className="mt-[3.25rem] mb-[6.5rem] px-5 space-y-[1.125rem]">
            <SectionBox title={internetsTitle}>
              <div className="flex gap-4 flex-wrap lg:justify-end">
                {internets.map(({ title, ...rest }) => (
                  <Link key={title} id="link" {...rest}>
                    <Trans string={title} name="hero-link" comps={COMPS} />
                  </Link>
                ))}
              </div>
            </SectionBox>
            <SectionBox title={createdAt} className={{ container: 'lg:items-center' }}>
              <p className="lg:text-right lg:max-w-[37.5rem]">{createdAtDesc}</p>
            </SectionBox>
            <SectionBox title={createdWith} className={{ container: 'lg:items-center' }}>
              <p className="lg:text-right lg:max-w-[37.5rem]">{createdWithDesc}</p>
            </SectionBox>
          </div>
          <Yusr className="w-[105%]" />
        </motion.footer>
      </div>
    </Fragment>
  );
}
