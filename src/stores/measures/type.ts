export type MeasuresState = {
  navbarHeight: number;
  navbarTop: number;
  navbarMTop: number;
  navbarMBottom: number;
};
export type MeasuresActions = {
  note: (key: keyof MeasuresState, value: number) => void;
  noteNavbar: (param: {
    height: number;
    top: number;
    marginTop: number;
    marginBottom: number;
  }) => void;
};
export type MeasuresStore = MeasuresState & MeasuresActions;
