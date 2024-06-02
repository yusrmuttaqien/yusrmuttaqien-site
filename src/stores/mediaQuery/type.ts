export type MediaQueryState = {
  isValidated: boolean | undefined;
  isXL: boolean | undefined;
  isHoverable: boolean | undefined;
  isDarkMode: boolean | undefined;
  isXL1380: boolean | undefined;
};
export type MediaQueryActions = {
  update: (key: keyof MediaQueryState, value: boolean | undefined) => void;
  bulkUpdate: (values: Partial<Record<keyof MediaQueryState, any>>) => void;
  validate: () => void;
};
export type MediaQueryStore = MediaQueryState & MediaQueryActions;
