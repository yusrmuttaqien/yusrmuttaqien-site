import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from '@/components/Link';
import useContent from '@/components/Navbar/hooks/content';

export default function Links() {
  const { asPath } = useRouter();
  const { sitemaps } = useContent();

  return (
    <Fragment>
      {sitemaps.map(({ title, href, ...rest }) => (
        <Link
          motionWrapper={{ className: 'hidden xl:block' }}
          id="link"
          key={title}
          isActive={href === asPath.split('#')[0]}
          href={href}
          {...rest}
        >
          {title}
        </Link>
      ))}
    </Fragment>
  );
}
