import { createSlice } from "@reduxjs/toolkit";
import { IMegaMenuShow } from "../lib/types/megaMenu";

const initialState: IMegaMenuShow = {
  isMegaMenuOpen: false,
  isMegaCollaboratorsMenuOpen: false,
};

const megaMenuSlice = createSlice({
  name: "megaMenu",
  initialState,
  reducers: {
    openMegaMenu(state) {
      state.isMegaMenuOpen = true;
    },
    closeMegaMenu(state) {
      state.isMegaMenuOpen = false;
    },
    openCollaboratorsMegaMenu(state) {
      state.isMegaCollaboratorsMenuOpen = true;
    },
    closeCollaboratorsMegaMenu(state) {
      state.isMegaCollaboratorsMenuOpen = false;
    },
  },
});

export const megaMenuActions = megaMenuSlice.actions;

export default megaMenuSlice.reducer;
