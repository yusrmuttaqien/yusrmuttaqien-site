export type CamelToKebabCase = string;
export type ClassMerge = (string | undefined | null | false)[];
export type IsOverflow = HTMLElement | null;
export type Wrap = {
  min: number;
  max: number;
  v: number;
};
export type ProgressiveArray = {
  steps: number;
  rangeEnd: number;
};
export type MoveToProps = {
  anchor: number;
  preoffset?: number;
  offset: number;
  boundary?: number;
};
export type InjectStringProps = {
  // TODO: Define the key of comps based on parsed string
  comps?: Record<string, any>;
  string: string;
  name: string;
  classNames?: Record<string, string>;
};
