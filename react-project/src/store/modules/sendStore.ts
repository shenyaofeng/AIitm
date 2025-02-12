import { createSlice } from "@reduxjs/toolkit";
import { replace } from "lodash";
import { getToken } from "../../utils";
import { message } from "antd";
import { AppDispatch } from "../index";


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
    //是否在回复中
    situation:false,
    sendInput:""
  },
  reducers: {
    // 发送的内容
    sendInput(state,action){
      state.sendInput = action.payload
    },
    //回复情况
    situation(state,action){
      state.situation = action.payload
    },
    //接收大模型的数据
    handleText(state, action) {
      state.receiveText += action.payload;
    },
    userSendText(state, action) {
      state.receiveText = "";
      // console.log(action.payload);
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
const { handleText, AISendText, userSendText, situation } =
  chatBotMessage.actions;
//异步action
const AItext = () => {
  return async (dispatch: AppDispatch) => {
    const token = getToken();
    const response = await fetch("http://127.0.0.1:7000/aicompletions", {
      method: "POST",
      headers: {
        Authorization: `${token}`
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "你好",
          },
        ],
        stream: true,
      }),
    });
    // 检查 response.body 是否为 null
    if (response.body === null) {
      console.error("响应体为空");
      return;
    }
    // 使用 response.body 进行后续操作
    const reader = await response.body.getReader();
    dispatch(situation(true));
    while (await reader) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      const decoder = new TextDecoder("utf-8");
      const text = await decoder.decode(value);
      if (text.includes("token失效")) {
        await message.error("登录失效，请重新登录");
        window.location.href = "/login";
        return;
      }
      // console.log(text);
      if (
        text.includes("data") &&
        !text.includes("[DONE]") &&
        text.includes("choices")
      ) {
        const parts = text.split("\n");
        for (let i = 0; i <= parts.length - 3; ) {
          const z = replace(parts[i], /data:/g, "");
          i = i + 2;
          const z1 = JSON.parse(z);
          // console.log(z1.choices[0].delta.content);
          dispatch(handleText(z1.choices[0].delta.content));
        }
      } else {
        dispatch(AISendText());
        dispatch(situation(false));
        return; 
      }
    }
  };
};

//获取reducer
const reducer = chatBotMessage.reducer;
//按需导出actionCreators函数
export { handleText, AISendText, AItext, userSendText, situation };

//默认导出reducer
export default reducer;
