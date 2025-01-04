import { createSlice } from "@reduxjs/toolkit";

type Message = {
  role: string;
  content: string;
  finish_reason : string;
};

const chatBotMessage = createSlice({
  name: "chatBotMessage",
  initialState: {
    //存储的聊天记录
    message: [] as Message[],
  },
  reducers: {
    //处理用户输入的文本
    handleText() {},
    // sendText(content) {
    //   message.push({ role: "user", content: content });
    // },
    sendText(state, action) {
      state.message.push({
        "role": "user", content: action.payload,
        "finish_reason": ""
      });
      state.message.push({ 
        "role": "assistant", 
        "content": "" ,
        "finish_reason": "start",
      });
    },
  },
});

//解构出来actionCreators函数
const { handleText, sendText } = chatBotMessage.actions;
//获取reducer
const reducer = chatBotMessage.reducer;
//按需导出actionCreators函数
export { handleText, sendText };
//默认导出reducer
export default reducer;
