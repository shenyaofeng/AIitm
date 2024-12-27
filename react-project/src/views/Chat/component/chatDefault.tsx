import "../chatDefault.scss"
import { RedoOutlined } from '@ant-design/icons';
const ChatDefault = () => {
  return (
    <div>
      <div className="start-page-view">
        <p className="greeting-text">你好，我是你的AI智能助手</p>
        <p className="intro-text">作为你的智能伙伴，我既能写文案，想点子，又能写代码，做表格</p>
        <div className="question-hint">
          <p className="question-text">可以试着问我：</p>
          <div className="change-btn">
            <RedoOutlined className="rotate-animation" />
            <p className="change">换一换</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatDefault;