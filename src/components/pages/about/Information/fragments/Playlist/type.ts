import type { Dispatch, RefObject, SetStateAction } from 'react';

export type PlaylistHeaderProps = {
  state: [number, Dispatch<SetStateAction<number>>];
  scope: RefObject<HTMLElement>;
};
