import { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { newAnecdote } from '../requests'
import NotificationContext from '../AnecdoteContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [, dispatch] = useContext(NotificationContext)
  const newAnecdoteMutation = useMutation(newAnecdote, {
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: error => {
      dispatch({ type: 'TOO_SHORT' })
      setTimeout(() => dispatch({ type: 'RESET' }), 5000)
    }
  })

  const onCreate = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content, votes: 0 })
    if (content.length < 5) return
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
