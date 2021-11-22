import { useState } from 'react'
import useRequest from './hooks/useRequest'

function App() {
  const [imgSrc, setImgSrc] = useState('');
  const [state] = useState({
    page: 2,
    size: 10
  })

  const service = () => {
    return fetch('https://api.thecatapi.com/v1/images/search')
  }

  const { loading, run, setParams, resetParams } = useRequest(service, {
    ignoreTheFirstRender: true,
    manual: true,
    defaultParams: {
      page: 1,
      size: 10
    },
    onSuccess: async(result, params) => {
    const res = await result.json()
      setImgSrc(res[0].url)
    },
  })

  return (
    <div className="App" style={{textAlign: 'center'}}>
      {
        loading && (<h1>Loading....</h1>)
      }
      {
        !loading && (
          <>
            <div>
              <button type="button" onClick={() => run(state)}>
                请求一张猫猫照片
              </button>
              <button onClick={() => setParams(params => ({ ...params, msg: 'hello' }))}>带参数的重新请求猫猫照片</button>
              <button onClick={resetParams}>resetParams</button>
              
            </div>
            {imgSrc && <img src={imgSrc} alt="kitty" width="700" />}
          </>
        )
      }
      
    </div>
  );
}

export default App;
