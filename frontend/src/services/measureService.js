import axios from 'axios'
const baseUrl = "/api/measures/"

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
  return axios.post(baseUrl + "reorder", {measureId: measure.id, up})
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