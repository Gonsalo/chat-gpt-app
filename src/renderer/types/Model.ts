export default interface Model {
  name: string;
  value: string;
  indicatorColor?: string;
  usage: {
    price: {
      input: number;
      output: number;
    };
    maxTokens: number;
  };
}
