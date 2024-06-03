import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useMeasuresStore } from '@/contexts/measures';
import Link from '@/components/Link';
import useContent from '@/components/Navbar/hooks/content';
import useVisible from '@/components/Navbar/fragments/Menu/hooks/visible';
import Language from '@/components/Navbar/fragments/Language';
import Availibility from '@/components/Navbar/fragments/Availibility';
import classMerge from '@/utils/classMerge';
import type { MenuProps } from '@/components/Navbar/fragments/Menu/type';

export default function Menu(props: MenuProps) {
  const { className, ...rest } = props;
  const { asPath } = useRouter();
  const { navbarHeight, navbarTop } = useMeasuresStore((store) => ({
    navbarHeight: store.navbarHeight,
    navbarTop: store.navbarTop,
  }));
  const { sitemaps } = useContent();
  const { scope } = useVisible();

  return (
    <motion.div
      {...rest}
      ref={scope}
      id="menu"
      data-lenis-prevent
      style={{ paddingTop: navbarHeight + navbarTop }}
      className={classMerge(
        'fixed inset-0 bg-dynamic-[beige_95] flex pr-[var(--pad-scrollbar)]',
        'invisible backdrop-blur-lg overflow-auto',
        className
      )}
    >
      <div className="flex flex-col justify-between items-center w-full gap-8">
        <div className="flex flex-1 flex-col items-center justify-center gap-8 perspective-5000">
          {sitemaps.map(({ title, href, ...rest }) => (
            <Link id="link" key={title} isActive={href === asPath} href={href} {...rest}>
              {title}
            </Link>
          ))}
          <Language />
        </div>
        <Availibility className={{ background: 'w-full origin-center' }} />
      </div>
    </motion.div>
  );
}
