const { ZhipuAI } = require("zhipuai-sdk-nodejs-v4");
const { apiKey } = require("@/config/zhipukey").zhipuai;
console.log({ apiKey });
const ai = new ZhipuAI({ apiKey });
class ZhipuAIController {
  async createCompletions(ctx) {
    console.log("123");
    const data = await ai.createCompletions({
      model: "glm-4-plus",
      messages: [
        {
          role: "user",
          content: "mate70是什么",
        },
      ],
      stream: true,
      tools: [
        {
          type: "web_search",
          web_search:{
            enable:true,
            search_result:true
          }
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
