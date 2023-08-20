/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { ReactNode } from 'react';
import { closeModal } from 'renderer/store/features/modal.slice';
import { useAppDispatch, useAppSelector } from 'renderer/store/store';

export interface ModalProps {
  id: string;
  dismissOnClickOutside?: boolean;
  children?: ReactNode;
}

function Modal({
  id = Math.random().toString(),
  dismissOnClickOutside,
  children,
}: ModalProps) {
  const { openedModalId } = useAppSelector(({ modal }) => modal);
  const dispatch = useAppDispatch();

  const handleOnBackpanelClick = () => {
    if (dismissOnClickOutside) {
      dispatch(closeModal());
    }
  };

  return (
    id === openedModalId && (
      <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center">
        <div
          className="absolute w-full h-full bg-gray-950/60"
          onClick={handleOnBackpanelClick}
        />
        <div className="p-6 bg-gray-950 rounded-lg z-50">{children}</div>
      </div>
    )
  );
}

Modal.defaultProps = {
  dismissOnClickOutside: false,
  children: [],
};

export default Modal;
