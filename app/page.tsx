import MainDetails from '@/app/fragments/main-details';
import MainHero from '@/app/fragments/main-hero';

export default function Page() {
  return (
    <main>
      <MainHero className="isolate z-10 bg-beige" />
      <div className="h-[300dvh] -mt-[100dvh]">
        <div className="sticky top-0">
          <MainDetails className="bg-green" />
          <MainDetails className="bg-grey" />
        </div>
      </div>
    </main>
  );
}
