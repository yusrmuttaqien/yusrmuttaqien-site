import Link from '@/components/link';
import FooterYusrMuttaqien from '@/fragments/footer/footer-yusr-muttaqien';
import classMerge from '@/utils/class-merge';
import useContent from '@/contents/footer';
import type { SectionProps } from '@/types/footer';

const linksWrapperStyle = classMerge(
  'flex flex-wrap gap-[clamp(0.5rem,_0.1364rem_+_1.8182vw,_0.625rem)]',
  'lg:gap-[clamp(0.625rem,_-0.8385rem_+_5.4455vw,_2rem)]'
);
const linkStyle = classMerge(
  'unhoverable:helvetica-neue-trim hoverable:hover-underline link-footer',
  'uppercase relative'
);

export default function FooterContent() {
  const {
    contents: { about, internets, site, tagline },
  } = useContent();

  return (
    <footer
      className={classMerge(
        'sticky bottom-0 p-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)]',
        'pt-[clamp(2.8125rem,_0.0852rem_+_13.6364vw,_3.75rem)]',
        'space-y-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)]'
      )}
    >
      <Section title={about.title}>
        <p className="lg:w-[31.25rem] text-grey-dynamic-[80] text-right">{about.content}</p>
      </Section>
      <Section title={site.title} className="lg:items-center">
        <div className={linksWrapperStyle}>
          {site.content.map((item) => (
            <Link key={item.title} href={item.link} className={linkStyle}>
              {item.title}
            </Link>
          ))}
        </div>
      </Section>
      <Section title={internets.title} className="lg:items-center">
        <div className={linksWrapperStyle}>
          {internets.content.map((item) => (
            <Link key={item.title} href={item.link} className={linkStyle}>
              {item.title}
            </Link>
          ))}
        </div>
      </Section>
      <section className="!mt-[clamp(7.0625rem,_-0.0284rem_+_35.4545vw,_9.5rem)]">
        <p className="body-subheading lg:-mb-[1.6vw]">{tagline}</p>
        <FooterYusrMuttaqien />
      </section>
    </footer>
  );
}

function Section(props: SectionProps) {
  const { title, children, className } = props;

  return (
    <section
      className={classMerge(
        'border border-grey-dynamic-[20] flex flex-col gap-[clamp(0.75rem,_0.0227rem_+_3.6364vw,_1rem)]',
        'p-[clamp(0.5rem,_0.1364rem_+_1.8182vw,_0.625rem)] justify-between lg:flex-row',
        className
      )}
    >
      <h2 className="body-subheading helvetica-neue-trim text-grey-dynamic-[60]">{title}</h2>
      {children}
    </section>
  );
}
