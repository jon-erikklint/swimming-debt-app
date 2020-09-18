import {useState, useEffect} from 'react';

export default function useInitialFetchData(callback) {
  const [data, setData] = useState(null)

  useEffect(() => {
    callback().then(res=> {
      if(res.data !== null && res.data !== "") setData(res.data)
    })
  }, [])

  return [data, setData]
}