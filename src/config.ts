import * as dotenv from "dotenv";

dotenv.config();

const {
    AZURE_OPENAI_API_KEY,
    AZURE_OPENAI_API_INSTANCE_NAME,
    AZURE_OPENAI_API_DEPLOYMENT_NAME,
    AZURE_OPENAI_API_VERSION
} = process.env;

const config = {
    AZURE_OPENAI_API_KEY,
    AZURE_OPENAI_API_INSTANCE_NAME,
    AZURE_OPENAI_API_DEPLOYMENT_NAME,
    AZURE_OPENAI_API_VERSION,
}

export default config;
