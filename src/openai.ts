import { Configuration, OpenAIApi } from 'azure-openai';
import type { ChatCompletionRequestMessage } from 'azure-openai';
import config from './config.js';

const configuration = new Configuration({
  apiKey: config.AZURE_OPENAI_API_KEY,
  azure: {
    apiKey: config.AZURE_OPENAI_API_KEY,
    endpoint: `https://${config.AZURE_OPENAI_API_INSTANCE_NAME}.openai.azure.com`,
    deploymentName: config.AZURE_OPENAI_API_DEPLOYMENT_NAME,
  },
});

const openai = new OpenAIApi(configuration);

async function createChatCompletion(messages: ChatCompletionRequestMessage[]) {
  let result = "";
  try {
    const response = await openai.createChatCompletion({
      model: config.AZURE_OPENAI_API_DEPLOYMENT_NAME as string,
      messages: messages,
      temperature: 0.2,
    });
    if (response.status === 200) {
      result =
        response.data.choices[0].message?.content.replace(/^\n+|\n+$/g, "") ||
        "";
    } else {
      console.log(
        `Something went wrong, code: ${response.status}, ${response.statusText}`
      );
    }
  } catch (e) {
    console.log(e.message);
  }
  return result;
}

export { createChatCompletion };
