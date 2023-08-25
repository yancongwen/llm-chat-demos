import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { SerpAPI } from 'langchain/tools';
import { Calculator } from 'langchain/tools/calculator';
import { azureOpenAIApiConfig } from '../config.js';

const tools = [new Calculator(), new SerpAPI()];

const chatModel = new ChatOpenAI({
  ...azureOpenAIApiConfig,
  temperature: 0
});

const greeting = await chatModel.predict('hello');

console.log(greeting);

const executor = await initializeAgentExecutorWithOptions(tools, chatModel, {
  agentType: 'openai-functions',
  verbose: true,
});

const result1 = await executor.run('What is the square root of 10, keeping two decimal places');
console.log(result1);

const result2 = await executor.run('What is the weather in New York?');
console.log(result2);
