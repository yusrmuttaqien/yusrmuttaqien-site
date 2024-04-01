import { projectsPagination } from '@/app/contents/main/en';
import { footerLinksTitles } from '@/app/contents/footer/en';

// #region main
export type ProjectsPagination = typeof projectsPagination;
// #endregion

// #region footer
export type LinkProperties = {
  href: string;
  target: '_self' | '_blank';
  onClick?: VoidFunction;
};
export type FooterLinks = Record<string, Record<string, LinkProperties>>;
export type FooterLinksTitles = keyof typeof footerLinksTitles;
// #endregion
