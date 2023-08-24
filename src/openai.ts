import { Configuration, OpenAIApi } from 'azure-openai';
import type { ChatCompletionRequestMessage } from 'azure-openai';
import * as dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  azure: {
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    endpoint: process.env.AZURE_OPENAI_API_EENDPOINT,
    deploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT,
  },
});

const openai = new OpenAIApi(configuration);

async function createChatCompletion(messages: ChatCompletionRequestMessage[]) {
  let result = "";
  try {
    const response = await openai.createChatCompletion({
      model: process.env.AZURE_OPENAI_API_DEPLOYMENT as string,
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
