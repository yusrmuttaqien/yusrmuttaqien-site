import { Fragment } from 'react';
import { useMediaQueryCtx } from '@/providers/media-query';
import { useLongPress } from '@/hooks/long-press';
import Link from '@/components/link';
import Marquee from '@/components/marquee';
import FooterContent from '@/fragments/footer/footer-content';
import InjectString from '@/utils/inject-string';
import useContent from '@/contents/footer';

export default function Footer() {
  const {
    contact: { copied, desktop, email, mobile },
  } = useContent();
  const { isHover } = useMediaQueryCtx();
  const handlers = useLongPress({ onFinish: _copyEmail, onInterrupt: _sendEmail });

  function _sendEmail() {
    window.location.href = `mailto:${email}`;
  }
  function _copyEmail() {
    // TODO: Change both alert to mouse trail
    try {
      navigator.clipboard.writeText(email).then(() => alert(copied));
    } catch (e) {
      alert(e);
    }
  }

  return (
    <Fragment>
      <div data-framer="footer-contact" className="py-[0.625rem] bg-grey-dynamic-[] relative z-10">
        <Marquee className={{ wrapper: 'gap-0' }} baseVelocity={100} direction={-1}>
          <Link
            className="text-beige-dynamic-[] body-subheading helvetica-neue-trim"
            href={`mailto:${email}`}
            {...handlers}
          >
            <InjectString
              string={isHover ? desktop : mobile}
              name="footer-contact"
              comps={{
                space: '\u00a0',
              }}
            />
          </Link>
        </Marquee>
      </div>
      <div className="-mt-[100vh] z-0">
        <span className="h-screen block" />
        <FooterContent />
      </div>
    </Fragment>
  );
}
