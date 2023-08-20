import { useAppSelector } from 'renderer/store/store';
import TokenCostCounter from './TokenCostCounter';

function ChatDetails() {
  const { selectedChat } = useAppSelector(({ chat }) => chat);
  return (
    selectedChat && (
      <div className="flex flex-row justify-between items-center py-1 px-3 shadow-sm shadow-gray-900">
        <span className="text-white font-light text-sm">
          {selectedChat?.name}
        </span>
        <TokenCostCounter usage={selectedChat?.usage} />
      </div>
    )
  );
}

export default ChatDetails;
