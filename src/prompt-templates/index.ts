import { ChatOpenAI } from 'langchain/chat_models/openai';
import { LLMChain } from 'langchain/chains';
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from 'langchain/prompts';

import { azureOpenAIApiConfig } from '../config.js';

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
  ...azureOpenAIApiConfig,
  temperature: 0
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
