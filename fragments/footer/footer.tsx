import { Fragment } from 'react';
import { useMediaQueryCtx } from '@/providers/media-query';
import Marquee from '@/components/marquee';
import InjectString from '@/utils/inject-string';
import FooterContent from '@/fragments/footer/footer-content';
import useContent from '@/contents/footer';

export default function Footer() {
  const { contact } = useContent();
  const { isHover } = useMediaQueryCtx();

  return (
    <Fragment>
      <div data-framer="footer-contact" className="py-[0.625rem] bg-grey-dynamic-[] relative z-10">
        <Marquee className={{ wrapper: 'gap-0' }} baseVelocity={100} direction={1}>
          <p className="text-beige-dynamic-[] body-subheading helvetica-neue-trim">
            <InjectString
              string={isHover ? contact.desktop : contact.mobile}
              name="footer-contact"
              comps={{
                space: '\u00a0',
              }}
            />
          </p>
        </Marquee>
      </div>
      <div className="-mt-[100vh] z-0">
        <span className="h-screen block" />
        <FooterContent />
      </div>
    </Fragment>
  );
}
