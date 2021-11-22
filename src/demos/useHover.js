import React, { useRef } from 'react'
import useHover from './hooks/useHover'

function App() {
  const ref = useRef();
  const onEnter = () => {
    console.log('enter')
  }
  const onLeave = () => {
    console.log('leave')
  }

  const isHovering = useHover(ref, {
    onEnter,
    onLeave
  })

  return (
    <div className="App" style={{textAlign: 'center'}}>
      <div ref={ref} style={{ background: 'pink' }}>{isHovering ? 'hover' : 'leaveHover'}</div>
    </div>
  );
}

export default App;
