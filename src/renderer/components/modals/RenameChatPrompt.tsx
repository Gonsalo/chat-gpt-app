import { useAppDispatch, useAppSelector } from 'renderer/store/store';
import Prompt from './Prompt';
import { updateChat } from '../../store/features/chat.slice';

export default function RenameChatPrompt() {
  const { selectedChat } = useAppSelector(({ chat }) => chat);

  const dispatch = useAppDispatch();

  const handleOnRenameChatPromptConfirm = (newName: string | undefined) => {
    if (selectedChat && newName) {
      dispatch(
        updateChat({
          _id: selectedChat._id,
          name: newName,
        })
      );
    }
  };

  return (
    selectedChat && (
      <Prompt
        id="rename_chat_prompt"
        title="Rename chat"
        defaultValue={selectedChat?.name}
        onConfirm={handleOnRenameChatPromptConfirm}
        dismissOnClickOutside
      />
    )
  );
}
