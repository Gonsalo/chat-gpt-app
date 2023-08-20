import React from 'react';
import Modal, { ModalProps } from './Modal';
import { useAppDispatch } from '../../store/store';
import { closeModal } from '../../store/features/modal.slice';
import SimpleTextButton from '../buttons/SimpleTextButton';

export interface ConfirmProps extends ModalProps {
  title?: string;
  hideCancel?: boolean;
  onConfirm: (...args: never[]) => void;
  onCancel?: () => void;
}

function Confirm({
  title,
  onConfirm,
  onCancel = () => {},
  hideCancel = false,
  children,
  ...props
}: ConfirmProps) {
  const dispatch = useAppDispatch();

  const handleOnConfirmClick = React.useCallback(() => {
    onConfirm();
    dispatch(closeModal());
  }, [onConfirm, dispatch]);

  const handleOnCancelClick = React.useCallback(() => {
    dispatch(closeModal());
    onCancel();
  }, [onCancel, dispatch]);

  return (
    <Modal {...props}>
      <div>
        {title && <h3 className="text-gray-100">{title}</h3>}
        {children}
      </div>
      <div className="flex flex-row gap-x-3 mt-2">
        <SimpleTextButton
          title="Confirm"
          className="flex-grow border border-gray-700 text-gray-200 hover:bg-gray-700 active:bg-gray-800 text-center"
          onClick={handleOnConfirmClick}
        />
        {!hideCancel && (
          <SimpleTextButton
            title="Cancel"
            className="flex-grow border border-gray-700 text-gray-200 hover:bg-red-700 hover:border-red-700 active:bg-red-800 text-center"
            onClick={handleOnCancelClick}
          />
        )}
      </div>
    </Modal>
  );
}

Confirm.defaultProps = {
  title: '',
  hideCancel: false,
  onCancel: () => {},
};

export default Confirm;
