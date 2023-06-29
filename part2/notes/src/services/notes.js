import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  if (!newToken) {
    token = null
    return
  }
  token = `Bearer ${newToken}`
}

const getAll =  async () => {
  const response =  await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  return await axios.post(baseUrl, newObject, config)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, update, setToken }