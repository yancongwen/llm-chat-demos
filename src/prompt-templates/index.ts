import { ChatOpenAI } from 'langchain/chat_models/openai';
import { LLMChain } from 'langchain/chains';
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from 'langchain/prompts';

import config from '../config.js';

const template =
  'You are a helpful assistant that translates {input_language} to {output_language}.';
const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(template);
const humanTemplate = '{text}';
const humanMessagePrompt =
  HumanMessagePromptTemplate.fromTemplate(humanTemplate);

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  systemMessagePrompt,
  humanMessagePrompt,
]);

const chatModel = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo', // Or gpt-3.5-turbo
  temperature: 0, // For best results with the output fixing parser
  azureOpenAIApiKey: config.AZURE_OPENAI_API_KEY, // In Node.js defaults to process.env.AZURE_OPENAI_API_KEY
  azureOpenAIApiVersion: config.AZURE_OPENAI_API_VERSION, // In Node.js defaults to process.env.AZURE_OPENAI_API_VERSION
  azureOpenAIApiInstanceName: config.AZURE_OPENAI_API_INSTANCE_NAME, // In Node.js defaults to process.env.AZURE_OPENAI_API_INSTANCE_NAME
  azureOpenAIApiDeploymentName: config.AZURE_OPENAI_API_DEPLOYMENT_NAME, // In Node.js defaults to process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME
});

const chain = new LLMChain({
  llm: chatModel,
  prompt: chatPrompt,
});

try {
  const result = await chain.call({
    input_language: 'English',
    output_language: 'French',
    text: 'I love programming',
  });
  console.log(result);
} catch (e) {
  console.log(e);
}
