import MyEditor from './Editor'
import Header from './Header'
import './App.css'
import { useState } from 'react';

function App() {
  const [indent, setIndent] = useState(2);

  return (
    <div className='container'>
      <Header value={{ indent }} onChange={(v) => {
        setIndent(v.indent)
      }} />
      <MyEditor indent={indent} />
    </div>
  )
}

export default App
