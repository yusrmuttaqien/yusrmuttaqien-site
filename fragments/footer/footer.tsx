import { Fragment } from 'react';
import Marquee from '@/components/marquee';
import FooterContent from '@/fragments/footer/footer-content';

export default function Footer() {
  return (
    <Fragment>
      <div data-framer="footer-contact" className="py-[0.625rem] bg-grey-dynamic-[] relative z-10">
        <Marquee baseVelocity={100} direction={1}>
          <p className="text-beige-dynamic-[] body-subheading helvetica-neue-trim">
            · CLICK TO GET IN TOUCH · CLICK + CTRL TO COPY EMAIL{' '}
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
