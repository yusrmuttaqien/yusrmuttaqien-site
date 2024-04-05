import { useAnimationSequenceCtx } from '@/providers/animation-sequence';

export default function Debugger() {
  const { state } = useAnimationSequenceCtx();

  return <p className="fixed z-[103] top-0 right-0">isLoader is {state.isLoader ? 'on' : 'off'}</p>;
}
