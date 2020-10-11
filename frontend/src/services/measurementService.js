import axios from 'axios'
const baseUrl = "http://localhost:3001/api/measurements/"

const get = measureName => {
  return axios.get(baseUrl + measureName)
}

const create = (measureId, amount) => {
  return axios.post(baseUrl, {measureId: measureId, value: amount})
}

export default {
  get,
  create
}