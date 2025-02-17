import InputBox from "./component/inputBox";
import ChatDefault from "./component/chatDefault";
import "./Chat.scss"
import React from "react";
const Chat = React.memo(() => {
  return (
    <div className="chatI">
      <ChatDefault />
      <div className="chat">
        <InputBox />
      </div>
    </div>
  )
})

export default Chat;