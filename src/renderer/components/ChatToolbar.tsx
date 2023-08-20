import FontSizeButton from './buttons/FontSizeButton';
import StreamButton from './buttons/StreamButton';
import ModelSelector from './ModelSelector';
import MinusIcon from './icons/Minus';
import PlusIcon from './icons/Plus';
import { FontSizes } from '../static/font_size_map';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  setMessageFeedFontSize,
  toggleOpenAiCompletionStream,
} from '../store/features/settings.slice';

export default function ChatToolbar() {
  const { messageFeedFontSize, openAiCompletionStream } = useAppSelector(
    ({ settings }) => settings
  );
  const dispatch = useAppDispatch();

  const setNewMessageFeedFontSize = (index: number) => {
    if (index >= 0 && index < FontSizes.length) {
      dispatch(setMessageFeedFontSize(index));
    }
  };

  const handleOnFontSizeIncreaseClick = () => {
    setNewMessageFeedFontSize(messageFeedFontSize! + 1);
  };
  const handleOnFontSizeDecreaseClick = () => {
    setNewMessageFeedFontSize(messageFeedFontSize! - 1);
  };

  const handleOnIsStreamToggleClick = () => {
    dispatch(toggleOpenAiCompletionStream());
  };

  return (
    <nav className="h-12 grid grid-cols-3 grid-rows-1 border-b border-gray-700 p-3">
      <div className="col-start-1 flex items-center justify-start">
        <StreamButton
          selected={openAiCompletionStream}
          onClick={handleOnIsStreamToggleClick}
        />
      </div>
      <div className="col-start-2 flex items-center justify-center">
        <ModelSelector />
      </div>
      <div className="col-start-3 flex items-center justify-end space-x-1">
        <FontSizeButton
          icon={MinusIcon}
          onClick={handleOnFontSizeDecreaseClick}
          title="Decrease font size"
        />
        <FontSizeButton
          icon={PlusIcon}
          onClick={handleOnFontSizeIncreaseClick}
          title="Increase font size"
        />
      </div>
    </nav>
  );
}
