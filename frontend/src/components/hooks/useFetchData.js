import {useState, useEffect} from 'react';

export default function useFetchData(callback) {
  const [data, setData] = useState(null)

  const update = val => {
    if (val !== undefined) {
      setData(val)
      return
    }

    callback().then(res=> {
      if(res.data !== null && res.data !== "") {
        setData(res.data)
      }
    })
  }

  useEffect(update, [])

  return [data, update]
}