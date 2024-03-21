import Link from 'next/link';
import Blueprint from '@/app/components/blueprint';
import SectionHeader from '@/app/components/section-header';
import FooterYusrMuttaqien from '@/app/fragments/footer/footer-yusr-muttaqien';
import classMerge from '@/app/utils/class-merge';
import { footerLinks } from '@/app/contents/footer';

export default function Footer() {
  return (
    <footer className="mt-[clamp(11.6281rem,_0.0009rem_+_58.1364vw,_15.625rem)] relative isolate">
      <div
        className={classMerge(
          'container relative z-10',
          'space-y-[clamp(2.9769rem,_0.0005rem_+_14.8818vw,_4rem)] mb-[clamp(5.5812rem,_-0.0006rem_+_27.9091vw,_7.5rem)]'
        )}
      >
        <SectionHeader
          subtitle="Work Together"
          title="Lorem ipsum dolor sit amet consectetur. A tempor bibendum a nunc sagittis congue."
          className={{
            subheadingChildren: 'hidden lg:block',
            header: 'md-only:gap-0',
            subheadingGroup: classMerge(
              'md-only:mb-[clamp(3.4419rem,_0.0001rem_+_17.2091vw,_4.625rem)]',
              'lg:flex lg:flex-col lg:justify-between'
            ),
            title: classMerge(
              'md-only:mb-[clamp(1.4881rem,_-0.001rem_+_7.4455vw,_2rem)]',
              'lg:w-[clamp(26.6875rem,_3.3131rem_+_44.843vw,_39.1875rem)]'
            ),
            headerChildren: 'lg:hidden',
          }}
        >
          <Link className="link-email" href="mailto:idyusril@gmail.com">
            idyusril@gmail.com
          </Link>
        </SectionHeader>
        <hr className="border-grey dark:border-beige border-2" />
        <FooterLinks />
      </div>
      <div className="p-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)]">
        <p className="body-subheading lg:-mb-[1.5vw]">Copyright @ yusr.muttaqien 2024</p>
        <FooterYusrMuttaqien />
      </div>
      <Blueprint className="absolute inset-0 z-0" />
    </footer>
  );
}

function FooterLinks() {
  return (
    <div className="flex gap-[clamp(4.2794rem,_0.0012rem_+_21.3909vw,_5.75rem)]">
      {Object.keys(footerLinks).map((key) => (
        <div key={key}>
          <h3 className="h3-normal mb-[clamp(1.4881rem,_-0.001rem_+_7.4455vw,_2rem)]">{key}</h3>
          <menu className="space-y-[clamp(0.5581rem,_-0.0001rem_+_2.7909vw,_0.75rem)]">
            {Object.entries(footerLinks[key]).map(([key, value]) => (
              <li key={key}>
                <Link
                  className={classMerge(
                    'text-grey/60 dark:text-beige/60 link-footer relative',
                    'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[0.125rem]',
                    'after:bg-grey/60 after:dark:bg-beige/60 after:scale-x-0',
                    'hoverable:hover:after:scale-x-100 after:transition-transform after:origin-left',
                    'hover:after:origin-right'
                  )}
                  href={value}
                >
                  {key}
                </Link>
              </li>
            ))}
          </menu>
        </div>
      ))}
    </div>
  );
}
