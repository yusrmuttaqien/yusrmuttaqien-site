import MainHero from '@/app/fragments/main-hero/main-hero';
import MainMasteries from '@/app/fragments/main-masteries/main-masteries';
import MainProjects from '@/app/fragments/main-projects/main-projects';
import PageWithRootParams from '@/app/utils/root-params';

export default PageWithRootParams(() => {
  return (
    <main className="isolate relative">
      <h1 className="absolute inset-0 invisible pointer-events-none">YUSR.MUTTAQIEN</h1>
      <MainHero className="z-10" />
      {/* <div className="h-[300svh] -mt-[100svh]">
        <div className="sticky top-0"> */}
      <MainMasteries />
      <MainProjects />
      {/* </div>
      </div> */}
    </main>
  );
});
