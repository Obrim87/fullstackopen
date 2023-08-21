import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [loginUser, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('persons-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const login = async (e) => {
    e.preventDefault()
    await loginUser({
      variables: { username: username, password: password }
    })
    setError('Logged in successfully.')
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        Username:{' '}
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />{' '}
        <br />
        Password:{' '}
        <input
          value={password}
          type='password'
          onChange={({ target }) => setPassword(target.value)}
        />{' '}
        <br />
        <button type='submit'>Log In</button>
      </form>
    </div>
  )
}

export default LoginForm
