import MainHero from '@/app/fragments/main-hero/main-hero';
import MainDetails from '@/app/fragments/main-details/main-details';
import MainProjects from '@/app/fragments/main-projects/main-projects';

export default function Page() {
  return (
    <main className="isolate">
      <MainHero className="z-10" />
      {/* <div className="h-[300dvh] -mt-[100dvh]">
        <div className="sticky top-0"> */}
      <MainDetails />
      <MainProjects />
      {/* </div>
      </div> */}
    </main>
  );
}
