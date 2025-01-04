const { ZhipuAI } = require("zhipuai-sdk-nodejs-v4");
const { apiKey } = require("@/config/zhipukey").zhipuai;
console.log({ apiKey });
const ai = new ZhipuAI({ apiKey });
class ZhipuAIController {
  async createCompletions(ctx) {
    console.log("123");
    const data = await ai.createCompletions({
      model: "glm-4-0520",
      messages: [{ role: "user", content: "你好" }],
      stream: true,
    });
    // console.log(data);
    // ctx.send(data);
    for await (const chunk of data) {
      console.log(chunk.toString());
      ctx.send(123);
    }
  }
}

module.exports = new ZhipuAIController();
