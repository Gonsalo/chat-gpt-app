/* eslint-disable no-use-before-define */

import React from 'react';
import { ChatCompletion } from 'openai/resources/chat';
import OpenAI from '../services/openai/openai';
import { useAppDispatch, useAppSelector } from '../store/store';
import SubmitButton from './buttons/SubmitButton';
import {
  insertChat,
  updateChat,
  setSelectedChat,
} from '../store/features/chat.slice';
import {
  insertMessage,
  removeMessage,
  saveMessageFeed,
  updateMessage,
} from '../store/features/message.slice';
import { instanceAsObject } from '../database/utils';
import MessageModel from '../database/api/messages/model';
import ChatModel from '../database/api/chats/model';
import TextArea from './TextArea';
import {
  countTokensForContent,
  getCompletionContent,
  getUsageTotalFromCompletions,
  mapAppMessagesToChatCompletionRequestMessages,
  truncateMessagesForModel,
} from '../services/openai/utils';
import { clearInput, setInputValue } from '../store/features/input.slice';

function ChatInput() {
  const { openAiApiKey, openAiCompletionStream } = useAppSelector(
    ({ settings }) => settings
  );
  const { models, selectedModel } = useAppSelector(({ model }) => model);
  const { value } = useAppSelector(({ input }) => input);
  const { selectedChat } = useAppSelector(({ chat }) => chat);
  const { messageFeedItems } = useAppSelector(({ message }) => message);

  const dispatch = useAppDispatch();

  const openai = React.useMemo(
    () => (openAiApiKey ? new OpenAI(openAiApiKey) : undefined),
    [openAiApiKey]
  );

  const newChat = () => {
    const chatModel = instanceAsObject(
      new ChatModel({
        name: 'New Chat',
        modelIndex: models.findIndex(
          (model) => model.value === selectedModel.value
        ),
      })
    );
    dispatch(insertChat(chatModel));
    dispatch(setSelectedChat(chatModel));
    return { ...chatModel };
  };

  const newMessage = (chatId: string, content: string, modelIndex?: number) => {
    const message = instanceAsObject(
      new MessageModel({
        chatId,
        content,
        modelIndex,
      })
    );
    dispatch(insertMessage(message));
    return { ...message };
  };

  const generateTitle = async (content: string) => {
    return openai?.completion(
      [
        {
          content: `Create a title with max 20 letters about:\n\n${content}`,
          role: 'user',
        },
      ],
      selectedModel.value
    );
  };

  const generateResponse = async (
    message: MessageModel,
    callback?: (completion: ChatCompletion, content?: string) => void
  ) => {
    const mappedToRequestMessages =
      mapAppMessagesToChatCompletionRequestMessages(
        ...messageFeedItems,
        message
      );

    const truncatedRequest = truncateMessagesForModel(
      selectedModel,
      mappedToRequestMessages
    );

    return truncatedRequest.length
      ? openai?.completion(truncatedRequest, selectedModel.value, callback)
      : undefined;
  };

  const generateResponseCompletion = async (
    chat: ChatModel,
    stream: boolean,
    msg: any
  ): Promise<ChatCompletion | undefined> => {
    const assistantMessage = newMessage(chat._id, '...', chat.modelIndex!);
    let completion: ChatCompletion | undefined;

    if (stream) {
      completion = await generateResponse(msg, ({ id }, content) => {
        assistantMessage.oid = id;
        assistantMessage.content = content!;
        dispatch(updateMessage(assistantMessage));
      });
    } else {
      completion = await generateResponse(msg);
    }

    if (completion) {
      assistantMessage.oid = completion.id;
      assistantMessage.usage = completion.usage!;
      assistantMessage.content = getCompletionContent(completion)!;
      dispatch(updateMessage(assistantMessage));
    }

    return completion;
  };

  const handleOnSubmit = async (userInput: string | undefined) => {
    if (!userInput) {
      return;
    }

    let chat = selectedChat && { ...selectedChat };
    if (!chat) {
      chat = newChat();
    }

    const totalMessagesAtStart = messageFeedItems.length;

    const userMessage = newMessage(chat._id, userInput);

    dispatch(clearInput());

    chat.modelIndex = models.findIndex(
      (model) => model.value === selectedModel.value
    );

    try {
      const completion = await generateResponseCompletion(
        chat,
        !!openAiCompletionStream,
        userMessage
      );

      const completions: ChatCompletion[] = [completion!];

      if (totalMessagesAtStart === 0) {
        const titleCompletion = await generateTitle(userInput);
        if (titleCompletion) {
          completions.push(titleCompletion);
          const newChatName = getCompletionContent(titleCompletion);
          if (newChatName) {
            chat.name = newChatName.replace(/"/gi, '');
          }
        }
      }

      chat.usage = getUsageTotalFromCompletions(selectedModel, ...completions);

      dispatch(saveMessageFeed(chat._id));
      dispatch(updateChat(chat));
    } catch (error) {
      dispatch(setInputValue(userInput));
      dispatch(removeMessage(userMessage._id));
    }
  };

  return (
    openAiApiKey && (
      <div className="flex py-2 px-3 rounded bg-gray-700/50 items-end">
        <div className="inline-flex justify-center w-14 p-2 select-none whitespace-nowrap text-sm overflow-hidden font-light text-white pb-3">
          {countTokensForContent(value)} tok
        </div>
        <TextArea onSubmit={handleOnSubmit} />
        <div className="pb-0.5">
          <SubmitButton onClick={handleOnSubmit} />
        </div>
      </div>
    )
  );
}

export default ChatInput;
