import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state =>
    state.anecdotes
      .filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .toSorted((a, b) => b.votes - a.votes)
  )

  const voteClicked = async anecdote => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    dispatch(increaseVote(updatedAnecdote))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <p key={anecdote.id}>
          {anecdote.content} <br />
          has {anecdote.votes} votes.{' '}
          <button onClick={() => voteClicked(anecdote)}>vote</button>
        </p>
      ))}
    </div>
  )
}

export default AnecdoteList
