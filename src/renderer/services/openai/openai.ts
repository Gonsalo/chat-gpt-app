import OpenAi from 'openai';
import {
  ChatCompletion,
  CreateChatCompletionRequestMessage,
} from 'openai/resources/chat';
import { createUsageForCompletion, readChatCompletionStream } from './utils';

interface StreamResponse {
  response: {
    body: ReadableStream;
  };
}

export default class OpenAI {
  private client: OpenAi;

  constructor(apiKey: string) {
    this.client = new OpenAi({
      apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  public async completion(
    messages: CreateChatCompletionRequestMessage[],
    model: string,
    callback?: (completion: ChatCompletion, content?: string) => void
  ): Promise<ChatCompletion> {
    const stream = callback !== undefined;
    const response = this.client.chat.completions.create({
      messages,
      model,
      stream,
    });

    return (
      stream
        ? this.streamedCompletion(
            response as unknown as Promise<StreamResponse>,
            messages,
            callback
          )
        : response
    ) as Promise<ChatCompletion>;
  }

  private async streamedCompletion(
    stream: Promise<StreamResponse>,
    messages: CreateChatCompletionRequestMessage[],
    callback: (completion: ChatCompletion, content?: string) => void
  ) {
    const completion = await readChatCompletionStream(
      (await stream).response.body.getReader(),
      callback
    );

    if (!completion) {
      throw new Error('Failed to stream completion');
    }

    const usage = createUsageForCompletion(completion, messages);

    if (usage) {
      completion.usage = usage;
    }

    return completion;
  }
}
