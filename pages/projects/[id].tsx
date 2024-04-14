import Link from 'next/link';
import TransitionSlideUp from '@/transitions/transition-slide-up';

export default function ProjectsID() {
  return (
    <TransitionSlideUp>
      <h1>Project ID</h1>
      <Link href="/">Go to Home</Link>
    </TransitionSlideUp>
  );
}
