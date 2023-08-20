/* eslint-disable no-use-before-define */

import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setInputValue } from '../store/features/input.slice';
import { CustomScroll } from '../untyped';

interface TextAreaProps {
  onSubmit: (input: string | undefined) => void;
}

function TextArea({ onSubmit }: TextAreaProps) {
  const { value } = useAppSelector(({ input }) => input);
  const dispatch = useAppDispatch();

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const customScrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    resizeTextarea();
  }, [value]);

  const resizeTextarea = () => {
    if (!customScrollRef.current || !textareaRef.current) {
      return;
    }
    textareaRef.current.style.height = '1px';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

    customScrollRef.current.style.height = '1px';
    customScrollRef.current.style.height = `${Math.min(
      200,
      customScrollRef.current.scrollHeight
    )}px`;
  };

  const handleOnTextareaChange = (evt: any) => {
    resizeTextarea();
    dispatch(setInputValue(evt.currentTarget.value));
  };

  const handleOnTextareaKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const { code, shiftKey } = event;

    if (code === 'Enter') {
      if (!shiftKey) {
        onSubmit?.(textareaRef.current?.value?.trim?.());
        event.preventDefault();
      }
    }
  };

  return (
    <CustomScroll
      ref={customScrollRef}
      className="w-full block mx-4 px-2.5 py-1.5 text-sm rounded-md outline-none overflow-hidden border bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:border-gray-500"
    >
      <textarea
        ref={textareaRef}
        value={value}
        rows={1}
        className="w-full pt-1 outline-none bg-transparent resize-none overflow-hidden"
        placeholder="Your message..."
        onChange={handleOnTextareaChange}
        onKeyDown={handleOnTextareaKeyDown}
      />
    </CustomScroll>
  );
}

export default TextArea;
