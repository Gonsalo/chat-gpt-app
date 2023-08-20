import SignalIcon from '../icons/Signal';
import SignalSlashIcon from '../icons/SignalSlash';

export default function StreamButton({ selected, onClick }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={selected ? 'Disable stream' : 'Enable stream'}
      className="select-none overflow-hidden overflow-ellipsis p-1 flex flex-row gap-x-0.5 items-center rounded-md outline-none text-xs text-gray-400 hover:cursor-pointer border border-gray-600 bg-gray-800 hover:bg-gray-700 hover:text-gray-200 active:bg-gray-600"
    >
      {selected ? <SignalSlashIcon /> : <SignalIcon />}
    </button>
  );
}
