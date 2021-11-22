import { useEffect, useRef } from "react";

export const getTargetElement = (target, defaultElement = window) => {
  if (!target) {
    return defaultElement
  }

  let targetElement;

  if (typeof target === 'function') {
    targetElement = target()
  } else if ('current' in target) {
    if (target.current) {
      targetElement = target.current
    } else {
      return defaultElement
    }
  } else {
    targetElement = target
  }

  return targetElement
}

const useEventListener = (eventName, handler, options) => {
  const handlerRef = useRef()
  handlerRef.current = handler

  useEffect(() => {
    const targetElement = getTargetElement(options.target)
    const eventListener = (event) => (handlerRef.current && handlerRef.current(event))

    targetElement.addEventListener(eventName, eventListener, {
      capture: options.capture,
      once: options.once,
      passive: options.passive,
    })
    return () => {
      targetElement.removeEventListener(eventName, eventListener, {
        capture: options.capture,
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventName, options.target, options.capture, options.once, options.passive])
}

export default useEventListener