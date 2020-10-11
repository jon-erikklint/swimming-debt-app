import axios from 'axios'
const baseUrl = "http://localhost:3001/api/measures/"

const getAll = () => {
  return axios.get(baseUrl)
}

const get = measureId => {
  return axios.get(baseUrl + measureId)
}

const update = alteredMeasure => {
  return axios.put(baseUrl, alteredMeasure)
}

const create = measure => {
  return axios.post(baseUrl, measure)
}

const reset = measureId => {
  return axios.post(baseUrl + "reset/" + measureId)
}

const deleteOne = measure => {
  return axios.delete(baseUrl + measure.id)
}

const reorder = (measure, up) => {
  return axios.post(baseUrl + "reorder", {measureName: measure.name, up})
}

export default {
  getAll,
  get,
  create,
  update,
  reset,
  deleteOne,
  reorder
}