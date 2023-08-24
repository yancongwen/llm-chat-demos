import inquirer from 'inquirer';
import { Spinner } from 'cli-spinner';
import { createChatCompletion } from './openai.js';

const spinner = new Spinner('Bot: %s');
spinner.setSpinnerString('|/-\\');

async function main() {
  start()
}

async function start() {
  const { prompt } = await inquirer.prompt({
    type: 'input',
    name: 'prompt',
    message: 'User: ',
  });
  if (!prompt.trim()) {
    start()
    return false
  }
  try {
    spinner.start();
    const response = await createChatCompletion([
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      {
        role: 'user',
        content: prompt
      }
    ]); 
    spinner.stop(true);
    console.log(`Bot: ${response?.trim()}`);
    start()
  } catch (error) {
    spinner.stop(true);
    console.log(error);
  }
}

main();
