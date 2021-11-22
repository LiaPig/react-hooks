import { useState, useEffect } from "react";

const useLocalStorageState = (key, defaultState, options = {}) => {
  const { listenToStorageChanges = true } = options
  const [localState, setLocalState] = useState(() => {
    const value = localStorage.getItem(key)
    if (!value) {
      return defaultState;
    }
    return JSON.parse(value)
  });

  // 同源页面监听改变实时刷新
  useEffect(() => {
    if (!listenToStorageChanges) {
      return
    }
    const storageFuction = function(e) {
      if (e.key === key) {
        const value = e.newValue
        setLocalState(JSON.parse(value))
      }
    }
    window.addEventListener('storage', storageFuction)
    return () => {
      window.removeEventListener('storage', storageFuction)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (localState) {
      localStorage.setItem(key, JSON.stringify(localState))
      return;
    }
    localStorage.removeItem(key);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localState]);

  return [localState, setLocalState];
};

export default useLocalStorageState;