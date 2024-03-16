export const ANIMATION_SEQUENCE_INITIAL_STATE = {
  hydrateCompleted: false,
  isSplashScreen: true,
  bigTitlePos: {
    hero: false,
    footer: false,
    navbar: false,
  },
} as {
  isSplashScreen: boolean;
  bigTitlePos: {
    hero: boolean;
    footer: boolean;
    navbar: boolean;
  };
};
