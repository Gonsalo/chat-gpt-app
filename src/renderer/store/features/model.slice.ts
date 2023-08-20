import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Model from 'renderer/types/Model';
import GPTModels from 'renderer/static/gpt_models';

interface InitialState {
  models: Model[];
  selectedModel: Model;
}

const initialState: InitialState = {
  models: GPTModels,
  selectedModel: GPTModels[0],
};

const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    setSelectedModel: (
      state,
      { payload: modelIndex }: PayloadAction<number>
    ) => {
      state.selectedModel = state.models[modelIndex];
    },
  },
});

export const { setSelectedModel } = modelSlice.actions;

export default modelSlice.reducer;
