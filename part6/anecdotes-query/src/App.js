import { getAnecdotes } from './requests'
import { useQuery } from 'react-query'
import { useContext } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import NotificationContext from './AnecdoteContext'

const App = () => {
  const { status, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const [notification, dispatch] = useContext(NotificationContext)

  return (
    <div>
      <h3>Anecdote app</h3>
      {status === 'error' ? (
        <div>
          <p>Anecdote service not available due to server error.</p>
          <p>Please contact your system Administrator.</p>
        </div>
      ) : (
        <>
          <Notification message={notification} />
          <AnecdoteForm />
          {status === 'loading' ? (
            '...Loading'
          ) : (
            <AnecdoteList anecdotes={data} />
          )}
        </>
      )}
    </div>
  )
}

export default App
