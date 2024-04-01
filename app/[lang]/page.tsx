import MainHero from '@/app/fragments/main/main-hero/main-hero';
import MainInteractive from '@/app/fragments/main/main-interactive';
import MainMasteries from '@/app/fragments/main/main-masteries/main-masteries';
import MainProjects from '@/app/fragments/main/main-projects/main-projects';
import PageWithRootParams from '@/app/utils/root-params';

export default PageWithRootParams(() => {
  return (
    <main className="isolate relative">
      <h1 className="absolute inset-0 invisible pointer-events-none">YUSR.MUTTAQIEN</h1>
      <MainInteractive />
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
