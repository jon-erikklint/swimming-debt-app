import axios from 'axios'
const baseUrl = "/api/measurements/"

const get = measureId => {
  return axios.get(baseUrl + measureId)
}

const create = (measureId, amount) => {
  return axios.post(baseUrl, {measureId: measureId, value: amount})
}

export default {
  get,
  create
}