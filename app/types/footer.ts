export type LinkProperties = {
  href: string;
  target: '_self' | '_blank';
  onClick?: () => void;
};
export type FooterLinks = Record<string, Record<string, LinkProperties>>;
