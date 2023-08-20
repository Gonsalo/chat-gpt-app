export enum OpenAIRole {
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant',
}

export default interface OpenAIMessage {
  role: OpenAIRole;
  content: string;
}
