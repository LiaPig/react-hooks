import { useState, useEffect } from 'react'
import { getTargetElement } from './useEventListener'

const useClickOutside = (target) => {
  const [isClickOutside, setIsClickOutside] = useState(false)

  const handler = (e) => {
    const targetElement = getTargetElement(target)
    if (!targetElement) {
      return
    }
    if (e.contains(targetElement)) {
      setIsClickOutside(false)
    } else {
      setIsClickOutside(true)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handler)
    return () => {
      document.removeEventListener('click', handler)
    }
  })

  return isClickOutside
}

export default useClickOutside
