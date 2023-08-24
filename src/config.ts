import * as dotenv from 'dotenv';

dotenv.config();

const {
  AZURE_OPENAI_API_KEY,
  AZURE_OPENAI_API_INSTANCE_NAME,
  AZURE_OPENAI_API_DEPLOYMENT_NAME,
  AZURE_OPENAI_API_VERSION,
} = process.env;

export const azureOpenAIApiConfig = {
  azureOpenAIApiKey: AZURE_OPENAI_API_KEY,
  azureOpenAIApiInstanceName: AZURE_OPENAI_API_INSTANCE_NAME,
  azureOpenAIApiDeploymentName: AZURE_OPENAI_API_DEPLOYMENT_NAME,
  azureOpenAIApiVersion: AZURE_OPENAI_API_VERSION,
};

export default { azureOpenAIApiConfig };
