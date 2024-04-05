import Link from 'next/link';
import TransitionSlideUp from '@/components/transition-slide-up';

export default function Home() {
  return (
    <TransitionSlideUp>
      <h1>Home</h1>
      <Link href="/project/any">Go to ProjectID</Link>
    </TransitionSlideUp>
  );
}
