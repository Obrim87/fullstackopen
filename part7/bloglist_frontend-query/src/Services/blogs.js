import axios from 'axios'
const baseUrl = '/api/blogs'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const newBlog = async ({ newBlog, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export const deleteBlog = async ({ user, blog }) => {
  const { token } = user
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

export const updateBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}

export const addComment = async ({ comments, id }) => {
  await axios.post(`${baseUrl}/${id}/comments`, comments)
}
