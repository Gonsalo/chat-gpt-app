import PaperPlaneIcon from '../icons/PaperPlane';

export default function SubmitButton({ onClick }: any) {
  return (
    <button
      type="button"
      title="Submit"
      onClick={onClick}
      className="inline-flex justify-center p-2 rounded-full outline-none cursor-pointer text-cyan-600 hover:bg-gray-600"
    >
      <PaperPlaneIcon className="w-6 h-6" />
    </button>
  );
}
