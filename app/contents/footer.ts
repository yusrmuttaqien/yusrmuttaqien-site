import { ANCHOR_HERO, ANCHOR_MASTERIES, ANCHOR_PROJECTS } from '@/app/constants/anchor';
import type { FooterLinks } from '@/app/types/footer';

export const footerLinks: FooterLinks = {
  Sitemaps: {
    Hero: { href: ANCHOR_HERO, target: '_self' },
    Masteries: { href: ANCHOR_MASTERIES, target: '_self' },
    Projects: { href: ANCHOR_PROJECTS, target: '_self' },
  },
  Socials: {
    LinkedIn: { href: 'https://www.linkedin.com/in/ydhm/', target: '_blank' },
    Github: { href: 'https://github.com/yusrmuttaqien', target: '_blank' },
    Instagram: { href: 'https://www.instagram.com/yusrmuttaqien/', target: '_blank' },
  },
};
export const emailAddress = 'idyusril@gmail.com';
