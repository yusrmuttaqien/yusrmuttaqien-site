import MainDetails from '@/app/fragments/main-details';
import MainHero from '@/app/fragments/main-hero';

export default function Page() {
  return (
    <main>
      <MainHero className="z-10" />
      {/* <div className="h-[300dvh] -mt-[100dvh]">
        <div className="sticky top-0"> */}
      <MainDetails />
      {/* </div>
      </div> */}
    </main>
  );
}
