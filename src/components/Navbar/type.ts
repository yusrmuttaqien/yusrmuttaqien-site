import { classes } from '@/components/Navbar';
import type { RefObject } from 'react';

export type NavbarProps = {
  className?: Partial<typeof classes.slots>;
};
export type HostProps = {
  scope: RefObject<HTMLDivElement>;
};
export type Links = 'home' | 'about' | 'projects' | 'techStack';
