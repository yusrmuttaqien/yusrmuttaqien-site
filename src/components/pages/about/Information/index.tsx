import useContent from '@/components/pages/about/Information/hooks/content';
import SectionBox from '@/components/SectionBox';
import Link from '@/components/Link';
import Trans from '@/components/Trans';
import DisplayCard from '@/components/DisplayCard';
import classMerge from '@/utils/classMerge';
import type { TransComp } from '@/components/Trans/type';

const SECTION_BOX_STYLES = { container: 'lg:flex-col lg:gap-4' };
const COMPS: TransComp = {
  default: (value, id) => (
    <span key={id} className="text-dynamic-green">
      {value}
    </span>
  ),
  D: (value, id) => (
    <span key={id} className="text-dynamic-[green_90]">
      {value}
    </span>
  ),
};

export default function Information() {
  const { about, cv, play, author } = useContent();

  return (
    <section
      className={classMerge(
        'min-h-full-total-navbar pb-5 flex flex-col gap-6 relative justify-between mt-10',
        'lg-970:gap-[10%] lg-970:flex-row xl:mt-0 xl:pb-8 xl:gap-[30%]'
      )}
    >
      <div className="space-y-[1.125rem] w-full lg-970:max-w-[50rem]">
        <SectionBox
          title={<Trans string={about.title} name={`about-title`} comps={COMPS} />}
          className={SECTION_BOX_STYLES}
        >
          <div className="space-y-[0.5lh]">
            {about.desc.map((desc) => (
              <p key={desc}>{desc}</p>
            ))}
          </div>
        </SectionBox>
        <SectionBox
          title={<Trans string={cv.title} name={`cv-title`} comps={COMPS} />}
          className={SECTION_BOX_STYLES}
        >
          <div className="flex gap-4 flex-wrap">
            {cv.lists.map(({ title, ...rest }) => (
              <Link
                key={title}
                id="link"
                download={`${title}-Yusril_Muttaqien.pdf`}
                target="_blank"
                {...rest}
              >
                <Trans string={title} name={`cv-${title}`} comps={COMPS} />
              </Link>
            ))}
          </div>
        </SectionBox>
        <SectionBox title={play.title} className={SECTION_BOX_STYLES}>
          <div className="space-y-[0.5lh] overflow-auto">
            {play.links.map((link) => (
              <iframe
                key={link}
                className="w-full aspect-square min-w-[26.875rem]"
                src={link}
                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            ))}
          </div>
        </SectionBox>
      </div>
      <DisplayCard
        alt="Yusril Muttaqien"
        category={author}
        title="Yusril Muttaqien"
        year="2024"
        src="https://source.unsplash.com/random"
        image={{ scale: 1 }}
        className={classMerge(
          'shrink-0 sticky top-[var(--navbar-docked-total-height)] h-max',
          'md:mx-auto md:w-[80vw] lg-970:mx-0 lg-970:w-[21.375rem]'
        )}
      />
    </section>
  );
}
