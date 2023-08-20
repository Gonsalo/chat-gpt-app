/* eslint-disable no-use-before-define */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SettingModel from '../../database/api/settings/model';
import { settingsApi } from '../../database/api';
import { initApis } from '../../database/utils';
import { openModal } from './modal.slice';

interface InitialState extends SettingModel {
  isAppDirSet: boolean;
}

const initialState: InitialState = {
  isAppDirSet: false,
  openAiApiKey: undefined,
  openAiCompletionStream: true,
  messageFeedFontSize: 1,
};

export const loadApplication = createAsyncThunk(
  'settings/loadApplication',
  async (_, thunkApi): Promise<boolean> => {
    const isAppDirSet = await window.electron.setApplicationDirectory();

    if (isAppDirSet) {
      await initApis();
      thunkApi.dispatch(loadSettings());
    }

    return isAppDirSet;
  }
);

export const pickApplicationDirectory = createAsyncThunk(
  'settings/pickApplicationDirectory',
  async (_, thunkApi): Promise<void> => {
    await window.electron.pickApplicationDirectory();
    await thunkApi.dispatch(loadApplication());
  }
);

export const loadSettings = createAsyncThunk(
  'settings/loadSettings',
  async (_, thunkApi): Promise<SettingModel> => {
    const settings = await settingsApi.read();

    if (!settings.openAiApiKey) {
      thunkApi.dispatch(openModal('insert_open_ai_key'));
    }

    return settings;
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setOpenAiApiKey: (state, { payload }) => {
      state.openAiApiKey = payload;
      if (state.openAiApiKey) {
        settingsApi.update({
          openAiApiKey: payload,
        });
      }
    },
    setMessageFeedFontSize: (state, { payload }) => {
      state.messageFeedFontSize = payload;
      if (state.messageFeedFontSize) {
        settingsApi.update({
          messageFeedFontSize: payload,
        });
      }
    },
    toggleOpenAiCompletionStream: (state) => {
      state.openAiCompletionStream = !state.openAiCompletionStream;
      settingsApi.update({
        openAiCompletionStream: state.openAiCompletionStream,
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(loadApplication.fulfilled, (state, { payload }) => {
      state.isAppDirSet = payload;
    });
    builder.addCase(loadSettings.fulfilled, (state, { payload }) => {
      state.openAiApiKey = payload.openAiApiKey;
      state.openAiCompletionStream = payload.openAiCompletionStream;
      state.messageFeedFontSize = payload.messageFeedFontSize;
    });
  },
});

export const {
  setOpenAiApiKey,
  setMessageFeedFontSize,
  toggleOpenAiCompletionStream,
} = settingsSlice.actions;

export default settingsSlice.reducer;
