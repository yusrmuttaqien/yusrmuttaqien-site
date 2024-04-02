'use client';

import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';

export default function Debugger() {
  const { state } = useAnimationSequenceCtx();
  const isForceDisableLayout = state.yusrMuttaqien.config.forceDisableLayout;

  return (
    <div className="fixed top-0 left-0 z-[200]">
      forceDisableLayout: {isForceDisableLayout ? 'yes' : 'no'}
    </div>
  );
}
