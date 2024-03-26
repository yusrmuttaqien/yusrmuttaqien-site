import Link from '@/app/components/link';
import Blueprint from '@/app/components/blueprint';
import SectionHeader from '@/app/components/section-header';
import FooterYusrMuttaqien from '@/app/fragments/footer/footer-yusr-muttaqien';
import classMerge from '@/app/utils/class-merge';
import footerContents from '@/app/contents/footer';
import { getRootParams } from '@/app/utils/root-params';
import type { i18nTypes } from '@/app/types/i18n';
import type { FooterLinksTitles } from '@/app/types/contents';

export default async function Footer() {
  const { params } = getRootParams();
  const { emailAddress, footerHeader, copyright } = await footerContents(params.lang as i18nTypes);

  return (
    <footer className="mt-[clamp(11.6281rem,_0.0009rem_+_58.1364vw,_15.625rem)] relative isolate">
      <div
        className={classMerge(
          'container relative z-10',
          'space-y-[clamp(2.9769rem,_0.0005rem_+_14.8818vw,_4rem)] mb-[clamp(5.5812rem,_-0.0006rem_+_27.9091vw,_7.5rem)]'
        )}
      >
        <SectionHeader
          subtitle={footerHeader.subtitle}
          title={footerHeader.title}
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
          <Link className="link-email" href={`mailto:${emailAddress}`}>
            {emailAddress}
          </Link>
        </SectionHeader>
        <hr className="border-grey dark:border-beige border-2" />
        <FooterLinks />
      </div>
      <div className="p-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)]">
        <p className="body-subheading lg:-mb-[1.5vw]">{copyright}</p>
        <FooterYusrMuttaqien />
      </div>
      <Blueprint className="absolute inset-0 z-0" />
    </footer>
  );
}

async function FooterLinks() {
  const { params } = getRootParams();
  const { footerLinks, footerLinksTitles } = await footerContents(params.lang as i18nTypes);

  return (
    <div className="flex gap-[clamp(4.2794rem,_0.0012rem_+_21.3909vw,_5.75rem)]">
      {Object.keys(footerLinks).map((key) => (
        <div key={key}>
          <h3 className="h3-normal mb-[clamp(1.4881rem,_-0.001rem_+_7.4455vw,_2rem)]">
            {footerLinksTitles[key as FooterLinksTitles]}
          </h3>
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
                  {...value}
                  locale={params.lang as i18nTypes}
                >
                  {footerLinksTitles[key as FooterLinksTitles] || key}
                </Link>
              </li>
            ))}
          </menu>
        </div>
      ))}
    </div>
  );
}
