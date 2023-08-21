import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_PERSON } from '../queries'

const PersonForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
      console.log(error)
    },
    // this is not used as the cache refresh is taken care of by the subscription in App.js. Leaving in for reference.

    // this updates the cache rather than refetching all data using refetchQueries
    // update: (cache, response) => {
    //   // first param is the query you want to update
    //   // second param is an update function, which is passed the cached 'data'
    //   cache.updateQuery({ query: ALL_PERSONS }, (data) => {
    //     // it returns a copy of the object with the new data (found in response param), appended
    //     return { allPersons: data.allPersons.concat(response.data.addPerson) }
    //   })
    // },
    onCompleted: () => {
      setName('')
      setPhone('')
      setStreet('')
      setCity('')
    }
  })

  const submit = (e) => {
    e.preventDefault()
    createPerson({
      variables: {
        name,
        street,
        city,
        phone: phone.length > 0 ? phone : undefined
      }
    })
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone{' '}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street{' '}
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city{' '}
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )
}

export default PersonForm
