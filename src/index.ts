import inquirer from 'inquirer';
import { Spinner } from 'cli-spinner';
import { Chatbot } from './chatbot.js';

const spinner = new Spinner('Bot: %s');
spinner.setSpinnerString('|/-\\');

const chatbot = new Chatbot();

async function start() {
  const { input } = await inquirer.prompt({
    type: 'input',
    name: 'input',
    message: 'User: ',
  });
  try {
    spinner.start();
    const response = await chatbot.sendMessage(input);
    spinner.stop(true);

    console.log('Bot: ' + response.message);
    if (response.over) {
      console.log('result: ' + JSON.stringify(response.slot));
      return;
    } else {
      // console.log('slot: ' + JSON.stringify(response.slot));
      start();
    }
    return response;
  } catch (error) {
    spinner.stop(true);
    console.log(error);
  }
}

async function main() {
  start();
}

main();
