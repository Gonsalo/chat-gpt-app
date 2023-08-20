import { useAppDispatch } from 'renderer/store/store';
import Prompt from './Prompt';
import { setOpenAiApiKey } from '../../store/features/settings.slice';

export default function InsertOpenAiApiKeyPrompt() {
  const dispatch = useAppDispatch();
  const handleOnSetApiKeyPromptConfirm = (key: string | undefined) => {
    if (key) {
      dispatch(setOpenAiApiKey(key));
    }
  };
  return (
    <Prompt
      id="insert_open_ai_key"
      title="Insert your OpenAI API key"
      onConfirm={handleOnSetApiKeyPromptConfirm}
      hideCancel
    />
  );
}
