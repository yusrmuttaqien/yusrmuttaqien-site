import { HTMLMotionProps } from 'framer-motion';
import { HTMLAttributes } from 'react';

export type MenuProps = HTMLAttributes<HTMLDivElement> & Omit<HTMLMotionProps<'div'>, 'className'>;
