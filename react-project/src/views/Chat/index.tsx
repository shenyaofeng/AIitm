import InputBox from "./component/inputBox";
import ChatDefault from "./component/chatDefault";
import "./Chat.css"
const Chat = () => {
  return (
    <div className="chatI">
      <ChatDefault />
      <div className="chat">
        <InputBox />
      </div>
    </div>
  )
}

export default Chat;