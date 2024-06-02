export type TogglesState = {
  isLoader: boolean;
  isNavMenu: boolean;
  isNavYM: boolean;
};
export type TogglesActions = {
  set: (key: keyof TogglesState, value: boolean) => void;
  toggle: (key: keyof TogglesState) => void;
};
export type TogglesStore = TogglesState & TogglesActions;
