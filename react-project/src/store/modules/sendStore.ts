import { createSlice } from "@reduxjs/toolkit";
import { replace } from "lodash";
type Message = {
  role: string;
  content: string;
  finish_reason: string;
};

const chatBotMessage = createSlice({
  name: "chatBotMessage",
  initialState: {
    //存储的聊天记录
    message: [] as Message[],
    receiveText: "",
  },
  reducers: {
    //接收大模型的数据
    handleText(state, action) {
      state.receiveText += action.payload;
    },
    // sendText(content) {
    //   message.push({ role: "user", content: content });
    // },
    userSendText(state, action) {
      console.log(action.payload);
      state.message.push({
        role: "user",
        content: action.payload,
        finish_reason: "",
      });
    },
    AISendText(state) {
      state.message.push({
        role: "assistant",
        content: state.receiveText,
        finish_reason: "",
      });
    },
  },
});

//解构出来actionCreators函数
const { handleText, AISendText, userSendText } = chatBotMessage.actions;
//异步action
const AItext = () => {
  return async (dispatch: any) => {
    const response = await fetch("http://127.0.0.1:7000/aicompletions", {
      method: "POST",
    });
    const reader = await response.body.getReader();
    while (await reader) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      const decoder = new TextDecoder("utf-8");
      const text = await decoder.decode(value);
      if (
        text.includes("data") &&
        !text.includes("usage") &&
        !text.includes("[DONE]") &&
        text.includes("choices")
      ) {
        const parts = text.split("\n");
        for (let i = 0; i <= parts.length - 3; ) {
          const z = replace(parts[i], /data:/g, "");
          i = i + 2;
          const z1 = JSON.parse(z);
          console.log(z1.choices[0].delta.content);
          dispatch(handleText(z1.choices[0].delta.content));
        }
      }else{
        return dispatch(AISendText())
      }
    }
  };
};

//获取reducer
const reducer = chatBotMessage.reducer;
//按需导出actionCreators函数
export { handleText, AISendText, AItext ,userSendText};

//默认导出reducer
export default reducer;
