import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password
}) => {
  return (
    <form onSubmit={handleLogin}>
      <Form.Group>
        <div>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            name='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type='submit' style={{ marginTop: 12 }}>
          Login
        </Button>
      </Form.Group>
    </form>
  )
}

export default LoginForm

//   Below is the version used with React Bootstrap
//   <div>
//   <h2>login</h2>
//   <form onSubmit={onSubmit}>
//     <Form.Group>
//       <Form.Label>Username:</Form.Label>
//       <Form.Control type='text' name='username' />
//       <Form.Label>Password:</Form.Label>
//       <Form.Control type='password' />
//       <Button variant={'success'} type='submit' style={{ marginTop: 12 }}>
//         Login
//       </Button>
//     </Form.Group>
//   </form>
// </div>
