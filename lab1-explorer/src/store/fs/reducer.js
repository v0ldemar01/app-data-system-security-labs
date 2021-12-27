import { createReducer } from '@reduxjs/toolkit';
import * as fsActions from './actions';

const initialState = {
  structure: [],
  loading: false,
  expandedFile: {}
}

export const reducer = createReducer(initialState, builder => {
  builder.addCase(fsActions.loadStructure.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(fsActions.loadStructure.fulfilled, (state, action) => {
    const { structure } = action.payload;
    state.structure = structure;
    state.loading = false;
  });
  builder.addCase(fsActions.toggleExpandedFile.fulfilled, (state, action) => {
    const { expandedFile } = action.payload;
    state.expandedFile = expandedFile;
  });
});