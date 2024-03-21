export const ANIMATION_SEQUENCE_INITIAL_STATE = {
  isCompsReady: {
    navbar: false,
  },
  isSplashScreen: true,
  bigTitlePos: {
    hero: false,
    footer: false,
    navbar: true,
  },
  navbarAnimatePresence: false,
} as {
  isCompsReady: {
    navbar: boolean;
  };
  isSplashScreen: boolean;
  bigTitlePos: {
    hero: boolean;
    footer: boolean;
    navbar: boolean;
  };
  navbarAnimatePresence: boolean;
};
