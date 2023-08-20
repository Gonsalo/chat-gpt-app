import React from 'react';
import { useAppSelector } from '../../store/store';
import Confirm, { ConfirmProps } from './Confirm';

interface PromptProps extends ConfirmProps {
  defaultValue?: string;
  onConfirm: (userInput: string | undefined) => void;
}

function Prompt({
  defaultValue,
  onConfirm,
  onCancel = () => {},
  ...props
}: PromptProps) {
  const { openedModalId } = useAppSelector(({ modal }) => modal);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (props.id === openedModalId && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [props.id, openedModalId]);

  const handleOnConfirmClick = React.useCallback(() => {
    const userInput = inputRef.current?.value?.trim?.();
    onConfirm(userInput);
  }, [onConfirm]);

  return (
    <Confirm {...props} onConfirm={handleOnConfirmClick} onCancel={onCancel}>
      <input
        ref={inputRef}
        type="text"
        defaultValue={defaultValue}
        className="bg-transparent outline-none text-gray-400 my-2"
        placeholder="Enter text"
      />
    </Confirm>
  );
}

Prompt.defaultProps = {
  defaultValue: '',
};

export default Prompt;
