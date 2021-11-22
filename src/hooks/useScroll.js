import { useState, useEffect } from 'react'
import {getTargetElement} from './useEventListener'

const useScroll = (target) => {
  const [position, setPosition] = useState({
    left: NaN,
    top: NaN
  })

  useEffect(() => {
    const el = getTargetElement(target, document);
    if (!el) return;

    const updatePosition = (currentTarget) => {
      let newPosition;
      if (currentTarget === document) {
        if (!document.scrollingElement) return
        newPosition = {
          left: document.scrollingElement.scrollLeft,
          top: document.scrollingElement.scrollTop,
        };
      } else {
        newPosition = {
          left: currentTarget?.scrollLeft,
          top: currentTarget?.scrollTop,
        };
      }
      // if (shouldUpdatePersist(newPosition)) 
      setPosition(newPosition)
    }
  
    // useEventListener('scroll', handler, { target })
    function listener(event) {
      if (!event.target) return;
      updatePosition(event.target);
    }
    el.addEventListener('scroll', listener);
    return () => {
      el.removeEventListener('scroll', listener);
    }
  }, [target])

  return position
}

export default useScroll