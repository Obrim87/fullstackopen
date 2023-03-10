import axios from 'axios'

const baseUrl = '/api/notes'

const getAll = () => {
  const res = axios.get(baseUrl)
  return res.then(res => res.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, update }