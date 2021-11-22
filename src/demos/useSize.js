import React, { useRef } from 'react'
import useSize from '../hooks/useSize'

function App() {
  const ref = useRef(null);
  const { width, height } = useSize(ref)

  return (
    <div className="App" style={{textAlign: 'right'}}>
      <div ref={ref} style={{ 
        position: 'absolute',
        width: '33%', 
        height: '66%', 
        background: 'pink' 
      }}>
        123213123
      </div>
      <div>{width}</div>
      <div>{height}</div>
    </div>
  );
}

export default App;
