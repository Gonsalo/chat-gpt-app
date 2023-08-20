import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  openedModalId?: string;
}

const initialState: InitialState = {
  openedModalId: undefined,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.openedModalId = payload;
    },
    closeModal: (state) => {
      state.openedModalId = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
