import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  value: string;
}

const initialState: InitialState = {
  value: '',
};

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    clearInput: (state) => {
      state.value = '';
    },
    setInputValue: (state, { payload: value }) => {
      state.value = value;
    },
  },
});

export const { clearInput, setInputValue } = inputSlice.actions;

export default inputSlice.reducer;
