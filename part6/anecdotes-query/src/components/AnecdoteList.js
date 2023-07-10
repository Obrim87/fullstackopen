import { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { addVote } from '../requests'
import NotificationContext from '../AnecdoteContext'

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()
  const addVoteMutation = useMutation(addVote, {
    onSuccess: updatedVote => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData(
        'anecdotes',
        anecdotes.map(anecdote => {
          if (anecdote.id === updatedVote.id) return updatedVote
          return anecdote
        })
      )
    }
  })

  const [, dispatch] = useContext(NotificationContext)

  const handleVote = anecdote => {
    addVoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch({ type: 'VOTE_ADDED', payload: anecdote })
    setTimeout(() => dispatch({ type: 'RESET' }), 5000)
  }

  return anecdotes.map(anecdote => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} votes.{' '}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  ))
}

export default AnecdoteList
