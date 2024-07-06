import { useState, useRef, type ChangeEvent } from 'react';
import { useIsomorphicLayoutEffect, motion, AnimatePresence } from 'framer-motion';
import useScrollLock from '@/hooks/scrollLock';
import useContent from '@/components/pages/about/Information/hooks/content';
import useEntry from '@/components/pages/about/Information/hooks/entry';
import SectionBox from '@/components/SectionBox';
import Link from '@/components/Link';
import Trans from '@/components/Trans';
import DisplayCard from '@/components/DisplayCard';
import classMerge from '@/utils/classMerge';
import Profile from '@/components/pages/about/Information/contents/images/profile.png';
import type { TransComp } from '@/components/Trans/type';
import type { PlaylistHeaderProps } from '@/components/pages/about/Information/type';

const SECTION_BOX_STYLES = { container: 'lg:flex-col lg:gap-4' };
const INFO_SECTION_LOCK_ID = 'info-section';
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
  const { about, cv, author } = useContent();
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
        <Playlist />
      </div>
      <DisplayCard
        id="yusril-muttaqien"
        alt="Yusril Muttaqien"
        category={author}
        title="Yusril Muttaqien"
        year="2024"
        src={Profile}
        image={{ scale: 1, placeholder: 'blur' }}
        className={classMerge(
          'shrink-0 sticky top-[var(--navbar-docked-total-height)] h-max',
          'md:mx-auto md:w-[80vw] lg-970:mx-0 lg-970:w-[21.375rem]'
        )}
      />
    </section>
  );
}

function PlaylistHeader(props: PlaylistHeaderProps) {
  const { state, scope } = props;
  const [list, setList] = state;
  const { play } = useContent();
  const { lock, unlock } = useScrollLock();
  const [isLocked, setIsLocked] = useState(false);
  let timeout: NodeJS.Timeout;

  function _toggleLock() {
    setIsLocked((prev) => {
      if (prev) {
        unlock(INFO_SECTION_LOCK_ID);

        return false;
      } else {
        lock(INFO_SECTION_LOCK_ID);

        return true;
      }
    });
  }
  function _loopPlaylists(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const root = scope.current as HTMLElement;
    const height = root.offsetHeight;

    requestAnimationFrame(() => {
      root.style.setProperty('height', `${height}px`);
    });
    requestAnimationFrame(() => {
      setList(parseInt(value) / 10 - 1);
    });

    timeout = setTimeout(() => {
      root.style.removeProperty('height');
    }, 100);
  }

  useIsomorphicLayoutEffect(() => {
    return () => {
      unlock(INFO_SECTION_LOCK_ID);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <span className="flex justify-between items-center gap-4">
      <span>
        {play.title} ({list + 1}/{play.links.length})
      </span>
      <input
        defaultValue={10}
        className="min-w-0"
        onChange={_loopPlaylists}
        type="range"
        min={10}
        max={play.links.length * 10}
        step={10}
        disabled={play.links.length <= 1}
      />
      <span className="text-dynamic-green underline cursor-pointer shrink-0" onClick={_toggleLock}>
        {isLocked ? play.unlock : play.lock}
      </span>
    </span>
  );
}

function Playlist() {
  const { play } = useContent();
  const scope = useRef<HTMLElement>(null);
  const [list, setList] = useState(0);
  const activeList = play.links[list];

  return (
    <SectionBox
      id="section"
      sectionRef={scope}
      title={<PlaylistHeader state={[list, setList]} scope={scope} />}
      className={{
        container: classMerge(SECTION_BOX_STYLES.container, 'relative isolate'),
      }}
    >
      <p
        className={classMerge(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'trim-helvetiva-neue font-semibold text-dynamic-[grey_60] z-10'
        )}
      >
        {play.loading}
      </p>
      <AnimatePresence>
        <motion.div className="space-y-[0.5lh] overflow-auto z-20" key={activeList}>
          <iframe
            key={activeList}
            className="w-full aspect-square min-w-[33.75rem]"
            src={activeList}
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </motion.div>
      </AnimatePresence>
    </SectionBox>
  );
}
