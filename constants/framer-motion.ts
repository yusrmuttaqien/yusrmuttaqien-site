import { cubicBezier } from 'framer-motion';
import { EASE_IN_OUT_QUART_NUM } from '@/constants/tailwind-config';

export const FRAMER_DEFAULT_TIMING = { duration: 0.3, ease: cubicBezier(...EASE_IN_OUT_QUART_NUM) };
