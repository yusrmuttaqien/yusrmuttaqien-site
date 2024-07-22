import { useRef, useState, type ChangeEvent } from 'react';
import { motion, AnimatePresence, useIsomorphicLayoutEffect } from 'framer-motion';
import useScrollLock from '@/hooks/scrollLock';
import useContent from '@/components/pages/about/Information/hooks/content';
import SectionBox from '@/components/SectionBox';
import classMerge from '@/utils/classMerge';
import { SECTION_BOX_STYLES } from '@/components/pages/about/Information/constant';
import { INFO_SECTION_LOCK_ID } from '@/components/pages/about/Information/fragments/Playlist/constant';
import type { PlaylistHeaderProps } from '@/components/pages/about/Information/fragments/Playlist/type';

export default function Playlist() {
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
        <motion.div className="space-y-[0.5lh] overflow-auto z-20 rounded-xl" key={activeList}>
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
