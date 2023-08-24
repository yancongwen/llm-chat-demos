import type { ChatCompletionRequestMessageRoleEnum } from 'azure-openai';
import { createChatCompletion } from './openai.js';

type Slot = {
  cellphone?: string;
  people_number?: number;
  meal_time?: string;
}

export class Chatbot {
  system_propmpt: string;
  slot: Slot;
  slot_labels: string[];
  messages: { role: ChatCompletionRequestMessageRoleEnum; content: string; }[];

  constructor() {
    this.system_propmpt = `
            现在你是一个餐厅的订餐客服机器人（角色是assistant），负责接待客户。你的目的是向用户获取手机号码、用餐人数量和用餐时间三个信息。你可以自由回复用户消息，但牢记你的目的。每一轮你需要输出给用户的回复，以及获取到的信息，信息应该以JSON方式存储，包括三个key：cellphone表示手机号码，people_number表示用餐人数，meal_time表示用餐时间储。

            请按照以下格式回复：
                给用户的回复：{回复给用户的话}
                获取到的信息：{"cellphone": null, "people_number": null, "meal_time": null}
        `;
    this.slot = {};
    this.slot_labels = ['meal_time', 'people_number', 'cellphone'];
    this.messages = [{ role: 'system', content: this.system_propmpt }];
  }

  check_over() {
    for (const label of this.slot_labels) {
      if (!this.slot[label]) {
        return false;
      }
    }
    return true;
  }

  async sendMessage(content: string) {
    this.messages.push({ role: "user", content });

    let bot_response;
    try {
      bot_response = await createChatCompletion(this.messages);
      this.messages.push({ role: "assistant", content: bot_response });

      const tmp = bot_response.split(/\n+/g);
      const bot_msg = tmp[0].replace("给用户的回复：", "").trim();
      if (tmp.length > 1) {
        this.slot = JSON.parse(tmp[1].replace("获取到的信息：", "").trim());
      }
      return {
        slot: this.slot,
        message: bot_msg,
        over: this.check_over(),
      };
    } catch (e) {
      console.log(e);
      return {
        slot: this.slot,
        message: "请重试",
        over: false,
      };
    }
  }
}

export default Chatbot;
