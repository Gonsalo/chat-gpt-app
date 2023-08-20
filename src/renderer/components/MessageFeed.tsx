// @ts-ignore
import CustomScroll from 'react-custom-scroller';
import React from 'react';
import clsx from 'clsx';
import { useAppSelector } from '../store/store';
import FontSize from '../static/font_size_map';
import ChatGPT from './icons/ChatGPT';
import UserCircle from './icons/UserCircle';
import MarkdownContent from './MarkdownContent';

function MessageFeed() {
  const { messageFeedFontSize } = useAppSelector(({ settings }) => settings);
  const { messageFeedItems } = useAppSelector(({ message }) => message);
  const { models } = useAppSelector(({ model }) => model);
  const mainRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        behavior: 'smooth',
        top: mainRef.current.scrollHeight + 50,
      });
    }
  }, [messageFeedItems]);

  return (
    <CustomScroll ref={mainRef} className="w-full">
      {messageFeedItems.map(
        ({ _id, modelIndex, content, oid }) =>
          content && (
            <div
              key={_id}
              className={clsx(
                'w-full border-b border-b-gray-600 shadow-inner  text-gray-200',
                {
                  'bg-gray-700/50 shadow-gray-800': modelIndex !== undefined,
                  'shadow-gray-900': modelIndex === undefined,
                }
              )}
            >
              <div
                className={clsx(
                  'w-full flex flex-row items-start gap-x-6 px-6 py-8',
                  messageFeedFontSize !== undefined &&
                    FontSize[messageFeedFontSize]
                )}
              >
                <div
                  className={clsx(
                    'w-6 rounded',
                    models[modelIndex]?.indicatorColor,
                    {
                      'p-1': !!oid,
                      'text-gray-400': !oid,
                    }
                  )}
                  title={models[modelIndex]?.name}
                >
                  {oid || modelIndex !== undefined ? (
                    <ChatGPT />
                  ) : (
                    <UserCircle />
                  )}
                </div>
                <div className="flex-grow flex flex-col gap-y-3">
                  <MarkdownContent>{content}</MarkdownContent>
                </div>
                <div className="self-end" />
              </div>
            </div>
          )
      )}
    </CustomScroll>
  );
}

export default MessageFeed;
