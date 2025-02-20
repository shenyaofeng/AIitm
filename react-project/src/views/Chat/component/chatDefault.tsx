import "../chatDefault.scss"
import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
// import {sendContent} from '../../../request/sendAPI'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index';
import remarkGfm from 'remark-gfm';// 划线、表、任务列表和直接url等的语法扩展
import rehypeRaw from 'rehype-raw'// 解析标签，支持html语法
//高亮的主题，还有很多别的主题，可以自行选择
import "github-markdown-css/github-markdown.css"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
//使用react-copy-to-clipboard库
//点击图标时复制代码内容
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Icon } from '@iconify/react'
import { message } from "antd";
// 代码块按钮
const CodeBlock = {
  // children就是代码块的内容
  // className就是代码块的语言
  code({ inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '')
    // 
    const handleCopy = () => {
      if (!isCopying) {
        setIsCopying(true);
        message.success("复制成功");
        setTimeout(() => {
          setIsCopying(false);
        }, 3000); // 2 秒后恢复可点击状态
      }
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isCopying, setIsCopying] = useState(false);
    return !inline && match ? (
      <div>
        {/* 使用react-copy-to-clipboard库,点击图标时复制代码内容 */}
        <CopyToClipboard text={children}>
          <Icon
            icon="mingcute:copy-line"
            className="copy-icon"
            onClick={handleCopy}
          />
        </CopyToClipboard>
        <SyntaxHighlighter
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }
}

const ChatDefault = React.memo(() => {
  const x = useSelector((state: RootState) => state.content.receiveText)
  // 监听x变化
  useEffect(() => {
    if (x) {
      setText(x)
    }
  }, [x])
  // 所有对话
  const message = useSelector((state: RootState) => state.content.message)

  const situation = useSelector((state: RootState) => state.content.situation)

  const history = Number(useSelector((state: RootState) => state.content.history))
  const [text, setText] = useState("")
  return (
    <div>
      {/* 如果没有对话则 */}
      {message.length == 0 && <div className="start-page-view">
        <p className="greeting-text">你好，我是你的AI智能助手</p>
        <p className="intro-text">作为你的智能伙伴，我既能写文案，想点子，又能写代码，做表格。</p>
      </div>}
      {/* 流式输出完毕后替换 */}
      {
        (message && history == -1) && message.map((item, index) => {
          return (
            <div key={index} className={`start-page-view ${item.role == "user" ? "start-page-view1" : ''}`}><ReactMarkdown
              className={`${item.role == "user" ? "user-content" : 'markdown-body '}`}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={CodeBlock}
            >
              {item.content}
            </ReactMarkdown>
            </div>
          )
        })
      }
      {/* 流式输出 */}
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
      {/* 如果是查看历史记录 */}
      {
        (history != -1) && (
          <div>
            <div className="start-page-view1">
              <ReactMarkdown
                className='user-content'
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {message[history].content}
              </ReactMarkdown>
            </div>
            <div className="start-page-view">
              <ReactMarkdown
                className='markdown-body'
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={CodeBlock}
              >
                {message[history + 1].content}
              </ReactMarkdown>
            </div>
          </div>

        )
      }
    </div>
  )
})

export default ChatDefault;