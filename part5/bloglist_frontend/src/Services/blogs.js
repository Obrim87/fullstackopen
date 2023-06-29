import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newBlog = async (blog, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  await axios.post(baseUrl, blog, config)
}

const deleteBlog = async (blog, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

const updateBlog = async blog => {
  await axios.put(`${baseUrl}/${blog.blogId}`, blog)
}

export default { getAll, newBlog, updateBlog, deleteBlog }
