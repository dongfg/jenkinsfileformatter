import MyEditor from './Editor'
import Header from './Header'
import './App.css'
import { useState, useEffect, useRef } from 'react';

function App() {
  const [indent, setIndent] = useState(2);
  const editorRef = useRef(null);

  useEffect(() => {
    setIndent(parseInt(localStorage.getItem("indent") || 2))
  }, [])

  return (
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
      <MyEditor ref={editorRef} indent={indent} />
    </div>
  )
}

export default App
