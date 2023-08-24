import { Configuration, OpenAIApi } from 'azure-openai';
import type { ChatCompletionRequestMessage } from 'azure-openai';
import { azureOpenAIApiConfig } from './config.js';

console.log(azureOpenAIApiConfig)

const configuration = new Configuration({
  apiKey: azureOpenAIApiConfig.azureOpenAIApiKey,
  azure: {
    apiKey: azureOpenAIApiConfig.azureOpenAIApiKey,
    endpoint: `https://${azureOpenAIApiConfig.azureOpenAIApiInstanceName}.openai.azure.com`,
    deploymentName: azureOpenAIApiConfig.azureOpenAIApiDeploymentName,
  },
});

const openai = new OpenAIApi(configuration);

async function createChatCompletion(messages: ChatCompletionRequestMessage[]) {
  let result = '';
  try {
    const response = await openai.createChatCompletion({
      model: azureOpenAIApiConfig.azureOpenAIApiDeploymentName,
      messages: messages,
      temperature: 0.2,
    });
    if (response.status === 200) {
      result =
        response.data.choices[0].message?.content.replace(/^\n+|\n+$/g, '') ||
        '';
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
