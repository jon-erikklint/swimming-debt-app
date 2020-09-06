import axios from 'axios'
const baseUrl = "http://localhost:3001/api/measures/"

const getAll = () => {
  return axios.get(baseUrl)
}

const get = measureName => {
  return axios.get(baseUrl + measureName)
}

const update = alteredMeasure => {
  return axios.put(baseUrl, alteredMeasure)
}

const reset = measureName => {
  return axios.post(baseUrl + "reset/" + measureName)
}

const deleteOne = measure => {
  return axios.delete(baseUrl + measure.name)
}

const reorder = (measure, up) => {
  return axios.post(baseUrl + "reorder", {measureName: measure.name, up})
}

export default {
  getAll,
  get,
  update,
  reset,
  deleteOne,
  reorder
}