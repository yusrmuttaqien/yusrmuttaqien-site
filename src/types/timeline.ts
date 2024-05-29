import { AnimationPlaybackControls } from 'framer-motion';

export type AnimationStatus = 'preparing' | 'running' | 'complete' | 'not-ready';
export type AnimationResumables = {
  instance: AnimationPlaybackControls | null;
  status: AnimationStatus;
};
