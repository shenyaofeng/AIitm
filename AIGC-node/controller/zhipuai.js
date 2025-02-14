const { ZhipuAI } = require("zhipuai-sdk-nodejs-v4");
const { apiKey } = require("@/config/zhipukey").zhipuai;
console.log({ apiKey });
const ai = new ZhipuAI({ apiKey });
global.data = ""
class ZhipuAIController {
  async sendInput(ctx){
    const { data } = ctx.request.body;
    global.data = data;
    ctx.send("完成");
  }
  // 文生文
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
      ctx.send("完成");
      ctx.res.write(chunk.toString());
    }
  }
  // 文生图
  async createImages(ctx) {
    const { prompt } = ctx.request.body;
    console.log(prompt);
    const imageData = await ai.createImages({
      model: "cogview-4",
      prompt,
    });
    console.log(imageData);
    ctx.send({
      url:imageData.data[0].url,
      prompt:"继续"
    });
  }
}

module.exports = new ZhipuAIController();
