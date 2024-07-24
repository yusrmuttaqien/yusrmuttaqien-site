import useContent from '@/components/pages/about/Information/hooks/content';
import useEntry from '@/components/pages/about/Information/hooks/entry';
import SectionBox from '@/components/SectionBox';
import Link from '@/components/Link';
import Trans from '@/components/Trans';
import DisplayCard from '@/components/DisplayCard';
import Playlist from '@/components/pages/about/Information/fragments/Playlist';
import classMerge from '@/utils/classMerge';
import Profile from '@/components/pages/about/Information/contents/images/profile.png';
import { SECTION_BOX_STYLES } from '@/components/pages/about/Information/constant';
import type { TransComp } from '@/components/Trans/type';

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
  const { about, cv, author, greeting, affiliate } = useContent();
  const { scope } = useEntry();

  return (
    <section
      ref={scope}
      className={classMerge(
        'min-h-full-total-navbar pb-5 flex flex-col gap-6 relative justify-between mt-10',
        'invisible lg-970:gap-[10%] lg-970:flex-row xl:mt-0 xl:pb-8 xl:gap-[30%]'
      )}
    >
      <div className="space-y-[1.125rem] w-full lg-970:max-w-[50rem]">
        <SectionBox
          id="section"
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
          id="section"
          title={<Trans string={cv.title} name={`cv-title`} comps={COMPS} />}
          className={SECTION_BOX_STYLES}
        >
          <div className="flex gap-4 flex-wrap">
            {cv.lists.map(({ title, ...rest }) => (
              <Link
                key={title}
                download={`${title}-Yusril_Muttaqien.pdf`}
                target="_blank"
                {...rest}
              >
                <Trans string={title} name={`cv-${title}`} comps={COMPS} />
              </Link>
            ))}
          </div>
        </SectionBox>
        <Playlist />
        <SectionBox id="section" title={affiliate.title} className={SECTION_BOX_STYLES}>
          <div className="flex gap-4 flex-wrap">
            {affiliate.lists.map(({ title, ...rest }) => (
              <Link key={title} target="_blank" {...rest}>
                {title}
              </Link>
            ))}
          </div>
        </SectionBox>
      </div>
      <DisplayCard
        content={{
          src: Profile,
          alt: 'Yusril Muttaqien',
          bottomRight: [author],
          topRight: '2024',
          topLeft: [greeting],
          bottomLeft: 'Yusril Muttaqien',
        }}
        id="yusril-muttaqien"
        image={{ scale: 1, placeholder: 'blur' }}
        className={classMerge(
          'shrink-0 sticky top-[var(--navbar-docked-total-height)] h-max',
          'md:mx-auto md:w-[80vw] lg-970:mx-0 lg-970:w-[21.375rem]'
        )}
      />
    </section>
  );
}
