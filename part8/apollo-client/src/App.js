import { useEffect, useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_PERSONS, PERSON_ADDED } from './queries'
import Persons from './components/Persons'
import PhoneForm from './components/PhoneForm'
import PersonForm from './components/PersonForm'
import LoginForm from './components/LoginForm'

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedPerson) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson))
    }
  })
}

function App() {
  const [message, setMessage] = useState('')
  const [token, setToken] = useState('')
  const client = useApolloClient()
  const result = useQuery(ALL_PERSONS)
  //   pollInterval: 2000 // polls the server every 2 seconds to refresh the data in  front end

  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`)
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
    }
  })

  useEffect(() => {
    const storedToken = localStorage.getItem('persons-token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  if (result.loading) {
    return <div>Loading...</div>
  }

  const logout = () => {
    localStorage.removeItem('persons-token')
    setToken('')
    client.resetStore()
  }

  return (
    <div>
      {token && (
        <div>
          Currently logged in. <button onClick={logout}>Log Out</button>
        </div>
      )}
      <Notify errorMessage={message} />
      {!token ? (
        <LoginForm setToken={setToken} setError={notify} />
      ) : (
        <div>
          <Persons persons={result.data.allPersons} />
          <PersonForm setError={notify} />
          <PhoneForm setError={notify} />
        </div>
      )}
    </div>
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

export default App
