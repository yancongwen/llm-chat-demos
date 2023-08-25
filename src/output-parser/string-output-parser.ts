import { ChatOpenAI } from 'langchain/chat_models/openai';
import { StringOutputParser } from 'langchain/schema/output_parser';
import { azureOpenAIApiConfig } from '../config.js';

const parser = new StringOutputParser();

const model = new ChatOpenAI({
  ...azureOpenAIApiConfig,
  temperature: 0,
});

const stream = await model.pipe(parser).stream('Hello there!');

for await (const chunk of stream) {
  console.log(chunk);
}
