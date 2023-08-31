import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { current } from 'immer';
import { removeEntityFromState, updateStateEntity } from './utils';
import { instanceAsObject } from '../../database/utils';
import MessageModel from '../../database/api/messages/model';
import { messagesApi } from '../../database/api';

interface InitialState {
  messageFeedItems: MessageModel[];
}

const initialState: InitialState = {
  messageFeedItems: [],
};

export const getMessageFeedItems = createAsyncThunk(
  'message/getMessageFeedItems',
  async (chatId: string) => messagesApi.find(chatId, { chatId })
);

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    insertMessage: (state, { payload }: PayloadAction<MessageModel>) => {
      state.messageFeedItems.push(instanceAsObject(payload));
    },
    updateMessage: (
      state,
      { payload }: PayloadAction<Partial<MessageModel>>
    ) => {
      updateStateEntity(state.messageFeedItems, payload);
    },
    removeMessage: (state, { payload }) => {
      state.messageFeedItems = removeEntityFromState(
        state.messageFeedItems,
        payload
      );
    },
    saveMessageFeed: (state, { payload }) => {
      messagesApi.save(current(state.messageFeedItems), payload);
    },
    clearMessageFeed: (state) => {
      state.messageFeedItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessageFeedItems.fulfilled, (state, { payload }) => {
      state.messageFeedItems = payload;
    });
  },
});

export const {
  insertMessage,
  updateMessage,
  removeMessage,
  saveMessageFeed,
  clearMessageFeed,
} = messageSlice.actions;

export default messageSlice.reducer;
