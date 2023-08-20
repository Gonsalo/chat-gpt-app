import { useAppDispatch, useAppSelector } from '../../store/store';
import { clearInput } from '../../store/features/input.slice';
import { clearMessageFeed } from '../../store/features/message.slice';
import { removeChat, setSelectedChat } from '../../store/features/chat.slice';
import Confirm from './Confirm';

export default function RemoveChatConfirm() {
  const { selectedChat } = useAppSelector(({ chat }) => chat);
  const dispatch = useAppDispatch();

  const handleOnRemoveChatPromptConfirm = () => {
    if (selectedChat) {
      dispatch(removeChat(selectedChat._id!));
      dispatch(clearInput());
      dispatch(setSelectedChat(undefined));
      dispatch(clearMessageFeed());
    }
  };

  return (
    selectedChat && (
      <Confirm
        id="remove_chat_prompt"
        title="Are you sure you want to remove this chat?"
        onConfirm={handleOnRemoveChatPromptConfirm}
      />
    )
  );
}
