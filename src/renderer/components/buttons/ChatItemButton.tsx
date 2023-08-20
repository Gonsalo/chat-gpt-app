import clsx from 'clsx';
import ChatBubbleIcon from '../icons/ChatBubble';
import PencilIcon from '../icons/Pencil';
import TrashIcon from '../icons/Trash';

export default function ChatItemButton({
  title,
  selected,
  onClick,
  onEditClick,
  onRemoveClick,
}: any) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={clsx(
        'w-full select-none overflow-hidden overflow-ellipsis p-3 rounded-md outline-none text-sm text-gray-200 shadow-gray-900 hover:cursor-pointer hover:bg-gray-700 hover:shadow-sm active:bg-gray-600/75',
        {
          'bg-gray-700': selected,
        }
      )}
    >
      <div className="flex flex-row gap-x-2.5 items-center">
        <span>
          <ChatBubbleIcon />
        </span>
        <span className="truncate">{title}</span>
        {selected && (
          <div className="flex-grow flex flex-row gap-x-1.5 items-center justify-end text-gray-400">
            <div title="Rename">
              <PencilIcon
                className="w-4 h-4 hover:text-gray-50"
                onClick={onEditClick}
              />
            </div>
            <div title="Remove">
              <TrashIcon
                className="w-4 h-4 hover:text-gray-50"
                onClick={onRemoveClick}
              />
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
