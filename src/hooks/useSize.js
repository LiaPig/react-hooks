import { useState, useEffect } from 'react'
import { getTargetElement } from './useEventListener'

const useSize = (target) => {
  const [state, setState] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const targetElement = getTargetElement(target) 
    if (!targetElement) {
      return
    }

    const observer = new ResizeObserver(function elResizeChange(entries) {
      // 每次被观测的元素尺寸发生改变这里都会执行
      entries.forEach((entry) => {
        const { width, height } = entry.target.getBoundingClientRect()
        setState({
          width: width,
          height: height,
        });
      });
    })
    observer.observe(targetElement) // 观测DOM元素

    return () => {
      observer.disconnect()
    }
  }, [target])

  return {
    ...state
  }
}

export default useSize