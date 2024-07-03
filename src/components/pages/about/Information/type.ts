import type { Dispatch, SetStateAction } from 'react';

export type PlaylistHeaderProps = {
  state: [number, Dispatch<SetStateAction<number>>];
};
