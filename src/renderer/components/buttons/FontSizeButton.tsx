export default function FontSizeButton({ icon: Icon, title, onClick }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="select-none overflow-hidden overflow-ellipsis p-1 flex flex-row gap-x-0.5 items-center rounded-md outline-none text-xs text-gray-400 hover:cursor-pointer border border-gray-600 bg-gray-800 hover:bg-gray-700 hover:text-gray-200 active:bg-gray-600"
    >
      <div className="font-semibold">A</div>
      <Icon className="w-2 h-2 fill-current stroke-current" />
    </button>
  );
}
