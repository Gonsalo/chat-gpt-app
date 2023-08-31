import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { current } from 'immer';
import { removeEntityFromState, updateStateEntity } from './utils';
import ChatModel from '../../database/api/chats/model';
import { chatsApi } from '../../database/api';

interface InitialState {
  chatItems: ChatModel[];
  selectedChat?: ChatModel;
}

const initialState: InitialState = {
  chatItems: [],
  selectedChat: undefined,
};

export const getChatItems = createAsyncThunk('chat/getChatItems', async () =>
  chatsApi.find({ active: true })
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChat: (
      state,
      { payload }: PayloadAction<ChatModel | undefined>
    ) => {
      state.selectedChat = payload;
    },
    insertChat: (state, { payload }: PayloadAction<ChatModel>) => {
      state.chatItems.push({
        ...payload,
        updatedAt: Date.now(),
      });
      chatsApi.insert(payload);
    },
    updateChat: (state, { payload }: PayloadAction<Partial<ChatModel>>) => {
      const updatedChat = updateStateEntity(state.chatItems, {
        ...payload,
        updatedAt: Date.now(),
      });

      if (updatedChat) {
        if (state.selectedChat?._id === updatedChat._id) {
          state.selectedChat = updatedChat;
        }
        chatsApi.update(current(updatedChat));
      }
    },
    removeChat: (state, { payload }: PayloadAction<string>) => {
      state.chatItems = removeEntityFromState(state.chatItems, payload);
      chatsApi.update({
        _id: payload,
        active: false,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChatItems.fulfilled, (state, { payload }) => {
      state.chatItems = payload;
    });
  },
});

export const { setSelectedChat, insertChat, updateChat, removeChat } =
  chatSlice.actions;

export default chatSlice.reducer;
