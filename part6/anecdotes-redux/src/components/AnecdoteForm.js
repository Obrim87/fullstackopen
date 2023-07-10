import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addClicked = async e => {
    e.preventDefault()
    const anecdote = {
      content: e.target.anecdoteInput.value,
      votes: 0
    }
    dispatch(newAnecdote(anecdote))
    dispatch(setNotification('New anecdote added.', 5))
    e.target.anecdoteInput.value = ''
  }

  return (
    <form onSubmit={addClicked}>
      <input
        type='text'
        name='anecdoteInput'
        id='anecdoteInput'
      />{' '}
      <br />
      <button type='submit'>Create</button>
    </form>
  )
}

export default AnecdoteForm

// upto React Query, useReducer and the context
