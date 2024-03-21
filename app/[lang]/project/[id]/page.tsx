import ProjectViewer from '@/app/fragments/project-viewer/project-viewer';
import PageWithRootParams from '@/app/utils/root-params';

export default PageWithRootParams(() => {
  return (
    <main className="isolate">
      <ProjectViewer />
    </main>
  );
});
