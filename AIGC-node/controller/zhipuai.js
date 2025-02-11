const { ZhipuAI } = require("zhipuai-sdk-nodejs-v4");
const { apiKey } = require("@/config/zhipukey").zhipuai;
console.log({ apiKey });
const ai = new ZhipuAI({ apiKey });
global.data = ""
class ZhipuAIController {
  async sendInput(ctx){
    const { data } = ctx.request.body;
    global.data = data;
    ctx.send(123);
  }
  async createCompletions(ctx) {
    console.log(ctx.request.body);
    const data = await ai.createCompletions({
      model: "glm-4-plus",
      messages: [
        {
          role: "user",
          content: global.data,
        },
      ],
      stream: true,
      tools: [
        {
          type: "web_search",
          web_search: {
            enable: true,
            search_result: true,
          },
        },
      ],
    });
    for await (const chunk of data) {
      ctx.send(123);
      ctx.res.write(chunk.toString());
    }
  }
}

module.exports = new ZhipuAIController();
