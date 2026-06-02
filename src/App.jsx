import MyEditor from './Editor'
import Header from './Header'
import Footer from './Footer'
import './App.css'
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

function App() {
  const [indent, setIndent] = useState(2);
  const editorRef = useRef(null);

  useEffect(() => {
    setIndent(parseInt(localStorage.getItem("indent") || 2))
  }, [])

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Jenkinsfile Formatter - Online Free Jenkinsfile Code Formatter / Beautifier</title>
        <meta name="description" content="Free online Jenkinsfile formatter &amp; beautifier. Format, indent, and beautify your Jenkinsfile / Groovy pipeline code instantly in your browser. Supports 2-space and 4-space indentation. No server upload - your code stays local. / 免费在线 Jenkinsfile 格式化工具，支持 2/4 空格缩进，代码完全本地处理，不上传服务器。" />
        <meta name="keywords" content="Jenkinsfile formatter, Jenkinsfile beautifier, Jenkinsfile online, format Jenkinsfile, Jenkins pipeline formatter, Groovy formatter, code formatter, Jenkinsfile 格式化, Jenkinsfile 美化, 在线 Jenkinsfile 格式化" />
        <link rel="canonical" href="https://jenkinsfileformatter.vercel.app/" />
      </Helmet>
      <div className='container'>
        <Header
          value={{ indent }}
          onChange={(v) => {
            setIndent(v.indent)
            localStorage.setItem("indent", v.indent)
          }}
          onFormat={() => {
            editorRef.current?.format();
          }}
        />
        <main>
          <MyEditor ref={editorRef} indent={indent} />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
