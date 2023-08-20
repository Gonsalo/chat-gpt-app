import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import settingsReducer from './features/settings.slice';
import messageSlice from './features/message.slice';
import chatReducer from './features/chat.slice';
import modelReducer from './features/model.slice';
import inputReducer from './features/input.slice';
import modalSlice from './features/modal.slice';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    chat: chatReducer,
    message: messageSlice,
    model: modelReducer,
    input: inputReducer,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
