import Model from 'renderer/types/Model';

const GPTModels: Model[] = [
  {
    name: 'GPT-3.5 Turbo',
    value: 'gpt-3.5-turbo',
    indicatorColor: 'bg-green-700',
    usage: {
      price: {
        input: 0.0000015,
        output: 0.000002,
      },
      maxTokens: 4000,
    },
  },
  {
    name: 'GPT-4',
    value: 'gpt-4',
    indicatorColor: 'bg-purple-700',
    usage: {
      price: {
        input: 0.00003,
        output: 0.00006,
      },
      maxTokens: 8000,
    },
  },
  {
    name: 'GPT-3.5 Turbo 16k',
    value: 'gpt-3.5-turbo-16k',
    indicatorColor: 'bg-green-700',
    usage: {
      price: {
        input: 0.000003,
        output: 0.000004,
      },
      maxTokens: 16000,
    },
  },
];

export default GPTModels;
