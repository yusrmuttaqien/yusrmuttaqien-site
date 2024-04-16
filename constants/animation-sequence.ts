export const ANIMATION_SEQUENCE_INITIAL_STATE = {
  isPageReady: false,
  isLoader: true,
  yusrMuttaqien: {
    hero: false,
    footer: false,
    navbar: true,
  },
  announcer: { announcing: false },
} as {
  isPageReady: boolean;
  isLoader: boolean;
  yusrMuttaqien: {
    hero: boolean;
    footer: boolean;
    navbar: boolean;
  };
  announcer: { announcing: boolean | 'manually' };
};
