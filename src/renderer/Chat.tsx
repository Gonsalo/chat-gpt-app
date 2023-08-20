/* eslint-disable no-nested-ternary */
import React from 'react';

import { useAppDispatch } from './store/store';
import './App.css';
import ChatInput from './components/ChatInput';
import ChatList from './components/ChatList';
import MessageFeed from './components/MessageFeed';
import { clearInput } from './store/features/input.slice';
import NewChatButton from './components/buttons/NewChatButton';
import ChatToolbar from './components/ChatToolbar';
import { getChatItems, setSelectedChat } from './store/features/chat.slice';
import { clearMessageFeed } from './store/features/message.slice';
import RenameChatPrompt from './components/modals/RenameChatPrompt';
import RemoveChatConfirm from './components/modals/RemoveChatConfirm';
import ChatDetails from './components/ChatDetails';

function Chat() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getChatItems());
  }, [dispatch]);

  const handleOnNewChatClick = () => {
    dispatch(clearInput());
    dispatch(setSelectedChat(undefined));
    dispatch(clearMessageFeed());
  };

  return (
    <>
      <aside className="w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in flex-shrink-0 border-r border-r-gray-600 h-screen overflow-hidden">
        <div className="p-2">
          <NewChatButton onClick={handleOnNewChatClick} />
        </div>
        <div className="w-full h-[calc(100%-4rem)] flex flex-1">
          <ChatList />
        </div>
      </aside>
      <div className="flex flex-col h-screen w-full -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <ChatToolbar />
        <ChatDetails />
        <main className="flex flex-1 overflow-hidden">
          <MessageFeed />
        </main>
        <div className="flex flex-col p-2">
          <ChatInput />
        </div>
      </div>
      <RenameChatPrompt />
      <RemoveChatConfirm />
    </>
  );
}

export default Chat;
