import { Suspense } from 'react';
import ProjectViewerInteractive from '@/app/fragments/project-viewer/project-viewer-interactive';

export default function ProjectViewer() {
  return (
    <Suspense fallback={<div className="h-[100svh]" />}>
      <ProjectViewerInteractive />
    </Suspense>
  );
}
