export const ANIMATION_SEQUENCE_INITIAL_STATE = {
  isCompsReady: {},
  isLoader: {
    exit: true,
    enter: true,
  },
  yusrMuttaqien: {
    hero: false,
    footer: false,
    navbar: true,
    config: {
      forceDisableLayout: false,
    },
  },
  announcer: { announcing: false },
} as {
  isCompsReady: {};
  isLoader: {
    exit: boolean;
    enter: boolean;
  };
  yusrMuttaqien: {
    hero: boolean;
    footer: boolean;
    navbar: boolean;
    config: {
      forceDisableLayout: boolean;
    };
  };
  announcer: { announcing: boolean | 'manually' };
};
