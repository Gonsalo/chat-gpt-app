/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */

import {
  ChatCompletion,
  ChatCompletionChunk,
  CreateChatCompletionRequestMessage,
} from 'openai/resources/chat';
import { CompletionUsage } from 'openai/resources';
import { encode as TokenEncoder } from 'gpt-tokenizer';
import Model from '../../types/Model';
import Usage from '../../types/Usage';
import MessageModel from '../../database/api/messages/model';

export const countTokensForContent = (content: string): number =>
  TokenEncoder(content).length;

export const countTokensForMessages = (
  messages: CreateChatCompletionRequestMessage[]
): number => {
  return messages.reduce(
    (acc, message) => acc + countTokensForContent(message.content ?? ''),
    0
  );
};

export const getUsageTotalFromCompletions = (
  model: Model,
  ...completions: ChatCompletion[]
): Usage => {
  return completions.reduce(
    (acc, { usage }) => {
      const { total_tokens, prompt_tokens, completion_tokens } =
        usage ?? <CompletionUsage>{};
      acc.totalTokensUsed += total_tokens ?? 0;
      acc.totalSpent +=
        ((prompt_tokens ?? 0) + (completion_tokens ?? 0)) *
        model.usage.price.input;
      return acc;
    },
    { totalSpent: 0, totalTokensUsed: 0 }
  );
};

export const getCompletionContent = (
  completion: ChatCompletion | undefined
): string | undefined => {
  return completion?.choices?.[0].message?.content ?? undefined;
};

export const createUsageForCompletion = (
  completion: ChatCompletion,
  messages: CreateChatCompletionRequestMessage[]
): ChatCompletion['usage'] => {
  const usage: ChatCompletion['usage'] = {
    prompt_tokens: countTokensForMessages(messages),
    completion_tokens: 0,
    total_tokens: 0,
  };
  const content = getCompletionContent(completion);
  if (content) {
    usage.completion_tokens = countTokensForContent(content) ?? 0;
    usage.total_tokens = usage.prompt_tokens + usage.completion_tokens;
  }

  return usage;
};

export const truncateMessagesForModel = (
  model: Model,
  messages: CreateChatCompletionRequestMessage[]
) => {
  let totalTokens = countTokensForMessages(messages);

  while (totalTokens > model.usage.maxTokens) {
    const message = messages.shift();

    if (!message) {
      break;
    }

    totalTokens -= countTokensForContent(message.content!);
  }

  return messages;
};

export const mapAppMessagesToChatCompletionRequestMessages = (
  ...messages: MessageModel[]
): CreateChatCompletionRequestMessage[] => {
  return messages.map(({ content, oid }) => ({
    content,
    role: oid ? 'assistant' : 'user',
  }));
};

export const readChatCompletionStream = async (
  reader: ReadableStreamDefaultReader<any>,
  callback: (completion: ChatCompletion, content?: string) => void,
  decoder: TextDecoder = new TextDecoder('utf-8'),
  processedCompletion: ChatCompletion | undefined = undefined
): Promise<ChatCompletion | undefined> => {
  const { done, value } = await reader.read();

  if (done) {
    return processedCompletion;
  }

  const chunkLines = decoder
    .decode(value)
    .split('\n')
    .map((line) => line.replace('data: ', '').trim());
  const isDone = chunkLines.includes('[DONE]');

  if (isDone) {
    return processedCompletion;
  }

  const parsedChunks: ChatCompletionChunk[] = chunkLines
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        return null;
      }
    })
    .filter(Boolean);

  // eslint-disable-next-line no-restricted-syntax
  for (const completion of parsedChunks) {
    if (!completion?.choices?.[0]?.delta?.content) {
      // eslint-disable-next-line no-continue
      continue;
    }

    // eslint-disable-next-line prefer-destructuring
    const content = completion.choices[0].delta.content;

    if (!processedCompletion) {
      // eslint-disable-next-line no-param-reassign
      processedCompletion = {
        ...(completion as any),
        choices: [
          {
            index: 0,
            message: {
              content,
              role: 'assistant',
            },
          },
        ],
      };
    } else {
      processedCompletion.choices[0].message.content += content;
    }

    callback(
      processedCompletion!,
      processedCompletion!.choices[0].message.content!
    );
  }

  return readChatCompletionStream(
    reader,
    callback,
    decoder,
    processedCompletion
  );
};
