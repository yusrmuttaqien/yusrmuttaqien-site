import { ReactNode } from 'react';
import { i18nTypes } from '@/app/types/i18n';

export type RootLayoutProps = Readonly<{
  children: ReactNode;
  params: {
    lang: i18nTypes;
  };
}>;
