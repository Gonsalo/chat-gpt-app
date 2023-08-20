import SpeakerWave from '../icons/SpeakerWave';

export default function SpeakButton({ onClick }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Listen"
      className="select-none overflow-hidden overflow-ellipsis p-1 rounded-md outline-none text-sm text-gray-500 hover:cursor-pointer hover:text-gray-200 active:text-gray-50"
    >
      <SpeakerWave />
    </button>
  );
}
