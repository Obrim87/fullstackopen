import { Form, Button } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../App'

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const client = useApolloClient()
  const token = useContext(TokenContext)
  const [loginMutation, result] = useMutation(LOGIN, {
    // refetchQueries: [{ query: CURRENT_USER }],
    onError: (error) => {
      console.log(error)
    },
    onCompleted: () => {
      setUsername('')
      setPassword('')
    }
  })

  useEffect(() => {
    if (result.data) {
      setToken(result.data.login.value)
      localStorage.setItem('library-token', result.data.login.value)
      navigate('/')
      navigate(0) // refreshes page
    }
  }, [result.data]) // eslint-disable-line

  if (result.loading) return <div>Loading...</div>

  const handleLogin = (e) => {
    e.preventDefault()
    if (!username || !password)
      return console.log('You must enter a username and password')
    client.resetStore()
    loginMutation({ variables: { username, password } })
  }

  return (
    <div>
      {token ? (
        <div style={{ marginTop: 20 }}>You are already logged in!</div>
      ) : (
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type='text'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button style={{ marginTop: 10, marginBottom: 10 }} type='submit'>
              Log In
            </Button>
          </Form.Group>
        </Form>
      )}
    </div>
  )
}

export default Login
