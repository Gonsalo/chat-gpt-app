import { CustomScroll } from '../untyped';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setSelectedChat } from '../store/features/chat.slice';
import { getMessageFeedItems } from '../store/features/message.slice';
import { setSelectedModel } from '../store/features/model.slice';
import { openModal } from '../store/features/modal.slice';
import ChatModel from '../database/api/chats/model';
import ChatItemButton from './buttons/ChatItemButton';

function groupByDay(collection: ChatModel[]): { [key: string]: ChatModel[] } {
  const grouped: { [key: string]: ChatModel[] } = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const item of [...collection].sort(
    (a, b) => b.updatedAt! - a.updatedAt!
  )) {
    const date = new Date(item.updatedAt!).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(item);
  }

  return grouped;
}

function ChatList() {
  const { chatItems, selectedChat } = useAppSelector(({ chat }) => chat);
  const dispatch = useAppDispatch();

  const handleOnChatSelectClick = (chat: ChatModel) => async () => {
    dispatch(setSelectedChat(chat));
    dispatch(getMessageFeedItems(chat._id!));
    if (chat.modelIndex) {
      dispatch(setSelectedModel(chat.modelIndex));
    }
  };

  const handleOnChatEditClick = () => {
    dispatch(openModal('rename_chat_prompt'));
  };

  const handleOnChatDeleteClick = () => {
    dispatch(openModal('remove_chat_prompt'));
  };

  return (
    <CustomScroll className="w-full p-2">
      {Object.entries(groupByDay(chatItems)).map(([date, group]) => (
        <div key={date} className="space-y-1">
          <span className="text-white text-xs font-light select-none pl-1">
            {date}
          </span>
          <div className="space-y-1">
            {group.map((chat) => (
              <ChatItemButton
                key={chat._id}
                title={chat.name}
                onClick={handleOnChatSelectClick(chat)}
                onEditClick={handleOnChatEditClick}
                onRemoveClick={handleOnChatDeleteClick}
                selected={chat._id === selectedChat?._id}
              />
            ))}
          </div>
        </div>
      ))}
    </CustomScroll>
  );
}

export default ChatList;
