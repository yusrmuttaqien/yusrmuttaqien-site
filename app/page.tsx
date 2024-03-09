import MainHero from '@/app/fragments/main-hero';
import MainDetails from '@/app/fragments/main-details';
import MainProjects from '@/app/fragments/main-projects';

export default function Page() {
  return (
    <main>
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
