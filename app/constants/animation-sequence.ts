export const ANIMATION_SEQUENCE_INITIAL_STATE = {
  isCompsReady: {},
  isLoader: true,
  isStarting: true,
  yusrMuttaqien: {
    hero: false,
    footer: false,
    navbar: true,
  },
  announcer: { announcing: false },
} as {
  isCompsReady: {};
  isLoader: boolean;
  isStarting: boolean;
  yusrMuttaqien: {
    hero: boolean;
    footer: boolean;
    navbar: boolean;
  };
  announcer: { announcing: boolean | 'manually' };
};
