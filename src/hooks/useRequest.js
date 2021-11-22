import { useEffect, useState, useCallback } from "react";
import useUpdateEffect from './useUpdateEffect'

const useRequest = (service, options) => {
  const { 
    manual = false, 
    onSuccess, 
    onError, 
    defaultParams = {}, 
    ignoreTheFirstRender = false
  } = options
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState(defaultParams)

  const resetParams = useCallback(
    () => {
      setParams(defaultParams)
    },
    [defaultParams],
  )
  const getParams = useCallback(
    () => {
      return params
    },
    [params],
  )
  const request = useCallback(
    async(state) => {
      setLoading(true)
      const res = await service(state ?? params)
      setLoading(false)
      if (res.status === 200) {
        if (typeof onSuccess === 'function') {
          onSuccess(res, params)
        }
      } else {
        if (typeof onError === 'function') {
          onError(res, params)
        }
      }
    },
    [params, service, onSuccess, onError],
  )

  useEffect(() => {
    if (ignoreTheFirstRender || manual) {
      return
    }
    if (!manual) {
      request()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  useUpdateEffect(() => {
    if (!ignoreTheFirstRender || manual) {
      return
    }
    if (!manual) {
      request()
    }
  }, [params])

  
  return {
    loading,
    run: request,
    setParams,
    resetParams,
    getParams
  }
}

export default useRequest
