import clsx from 'clsx';

export default function SimpleTextButton({
  title,
  className = 'border border-gray-700 text-gray-200 hover:bg-gray-700 active:bg-gray-800',
  onClick,
}: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'select-none overflow-hidden overflow-ellipsis p-3 rounded-md outline-none text-sm hover:cursor-pointer',
        className
      )}
    >
      {title}
    </button>
  );
}
