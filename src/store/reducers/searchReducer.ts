import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SearchState {
  results: string[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchStart(state) {
      state.loading = true;
      state.error = null;
    },
    searchSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.results = [...state.results, action.payload];
    },
    searchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {searchStart, searchSuccess, searchFailure} = searchSlice.actions;

export default searchSlice.reducer;
