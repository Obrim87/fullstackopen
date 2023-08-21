import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from '../queries'

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [changeNumber] = useMutation(EDIT_NUMBER, {
    onError: (error) => {
      setError('Number not found.')
      console.log(error)
    },
    onCompleted: () => {
      setName('')
      setPhone('')
    }
  })

  const submit = (event) => {
    event.preventDefault()
    changeNumber({ variables: { name, phone } })
  }

  return (
    <div>
      <h2>Change Number</h2>

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
        <button type='submit'>change number</button>
      </form>
    </div>
  )
}

export default PhoneForm
