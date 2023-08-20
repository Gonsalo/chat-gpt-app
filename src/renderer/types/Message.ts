import { CompletionUsage } from 'openai/resources';

export default interface Message {
  id: string;
  content: string;
  modelIndex?: number;
  usage?: CompletionUsage;
}
