import PlusIcon from '../icons/Plus';

export default function NewChatButton({ onClick }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex flex-row items-center gap-x-2 select-none overflow-hidden overflow-ellipsis p-3 rounded-md outline-none text-sm border border-gray-700 text-gray-200 hover:cursor-pointer hover:bg-gray-700 active:bg-gray-800"
    >
      <PlusIcon /> <span>New Chat</span>
    </button>
  );
}
