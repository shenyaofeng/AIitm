import InputBox from "./component/inputBox";
import "../Chat/Chat.scss"
const Paint = () => {
  return (
    <div className="chatI">
      绘画页面
      <div className="chat">
        <InputBox />
      </div>
    </div>
  )
}

export default Paint;