import { useState, useCallback } from "react";
import useEventListener from './useEventListener'

const useHover = (target, options = {}) => {
  const { onEnter, onLeave } = options
  const [isHovering, setIsHovering] = useState(false)

  const hoverHandler = useCallback(
    () => {
      setIsHovering(true)
      if (typeof onEnter === 'function') {
        onEnter()
      }
    },
    [onEnter],
  )
  const outHandler = useCallback(
    () => {
      setIsHovering(false)
      if (typeof onLeave === 'function') {
        onLeave()
      }
    },
    [onLeave],
  )

  useEventListener('mouseover', hoverHandler, {
    target
  })
  useEventListener('mouseout', outHandler, {
    target
  })

  return isHovering
}

export default useHover


