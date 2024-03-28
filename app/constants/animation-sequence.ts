export const ANIMATION_SEQUENCE_INITIAL_STATE = {
  isCompsReady: {},
  isLoader: true,
  bigTitlePos: {
    hero: false,
    footer: false,
    navbar: true,
  },
  navbarAnimatePresence: false,
  announcing: false,
} as {
  isCompsReady: {};
  isLoader: boolean;
  bigTitlePos: {
    hero: boolean;
    footer: boolean;
    navbar: boolean;
  };
  navbarAnimatePresence: boolean;
  announcing: boolean | 'manually';
};
