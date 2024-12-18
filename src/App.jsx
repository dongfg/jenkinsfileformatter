import MyEditor from './Editor'
import Header from './Header'
import './App.css'
import { useState, useEffect } from 'react';

function App() {
  const [indent, setIndent] = useState(2);

  useEffect(() => {
    setIndent(parseInt(localStorage.getItem("indent") || 2))
  }, [])

  return (
    <div className='container'>
      <Header value={{ indent }} onChange={(v) => {
        setIndent(v.indent)
        localStorage.setItem("indent", v.indent)
      }} />
      <MyEditor indent={indent} />
    </div>
  )
}

export default App
