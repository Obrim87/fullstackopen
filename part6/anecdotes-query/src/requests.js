import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const newAnecdote = async anecdote => {
  if (anecdote.content.length < 5) {
    await axios.post(`${baseUrl}/error`)
  }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

export const addVote = async anecdote => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return response.data
}
