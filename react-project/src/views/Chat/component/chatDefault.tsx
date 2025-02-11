import "../chatDefault.scss"
import { RedoOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
// import {sendContent} from '../../../request/sendAPI'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index';
import remarkGfm from 'remark-gfm';// 划线、表、任务列表和直接url等的语法扩展
import rehypeRaw from 'rehype-raw'// 解析标签，支持html语法
//高亮的主题，还有很多别的主题，可以自行选择
import "github-markdown-css/github-markdown.css"
const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'bla',
  borderRadius: '10px',
};
const ChatDefault = () => {
  const x = useSelector((state: RootState) => state.content.receiveText)
  useEffect(() => {
    if (x) {
      setText(x)
    }
  }, [x])
  const y = useSelector((state: RootState) => state.content.message)

  const situation = useSelector((state: RootState) => state.content.situation)
  
  const [text, setText] = useState("")

  return (
    <div>
      <div className="start-page-view">
        <p className="greeting-text">你好，我是你的AI智能助手</p>
        <p className="intro-text">作为你的智能伙伴，我既能写文案，想点子，又能写代码，做表格。</p>
        {/* <div className="question-hint">
          <p className="question-text">可以试着问我：</p>
          <div className="change-btn">
            <RedoOutlined className="rotate-animation" />
            <p className="change">换一换</p>
          </div>
        </div>
        <Carousel arrows infinite={false}>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel> */}
      </div>
      {
        y && y.map((item, index) => {
          return (
            <div key={index} className="start-page-view"><ReactMarkdown
              className='markdown-body'
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {item.content}
            </ReactMarkdown></div>
          )
        })
      }
      {(text && situation) && (<div className="start-page-view">
        {
          text &&
          <ReactMarkdown
            className='markdown-body'
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {text}
          </ReactMarkdown>
        }
      </div>)}
    </div>
  )
}

export default ChatDefault;