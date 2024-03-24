import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TTheme = "light" | "dark";

type initialStateType = {
  theme: TTheme;
};

const initialState: initialStateType = {
  theme: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state, { payload }: PayloadAction<TTheme>) {
      state.theme = payload;
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
