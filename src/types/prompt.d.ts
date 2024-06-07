interface ChatGptPrompt {
    model: string;
    messages: ChatCompletionMessageParam[];
    temperature: number;
  }