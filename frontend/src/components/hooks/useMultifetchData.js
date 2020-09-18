import axios from "axios"

import useFetchData from "./useFetchData"

export default function useMultifetchData(...callbacks) {
  // fetches all callbacks, and returns them to useFetch as one pseudo request with either all datas as an array, or as null if some of them didn't return
  const [dat, update] = useFetchData(
    () => axios
      .all(callbacks)
      .then(
        axios.spread((...res) => {
          if (res.find(res => res.data === null || res.data === "") !== undefined) {
            return {data: null}
          } else {
            return {data: res.map(res => res.data)}
          }
        })
      )
  )

  // to make sure the return value is always an array of right length
  const returnDat = dat === null 
    ? callbacks.map(_ => null)
    : dat

  return [returnDat, update]
}