import { useState } from 'react'
import { Table, Alert, Navbar, Nav, Form } from 'react-bootstrap'
import styled from 'styled-components'
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch
} from 'react-router-dom'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

const Home = () => (
  <div>
    <h2>My notes app</h2>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  </div>
)

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div>
        <strong>{note.important ? 'important' : ''}</strong>
      </div>
    </div>
  )
}

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <Table striped>
      <tbody>
        {notes.map((note) => (
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </td>
            <td>{note.user}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

const Users = () => (
  <div>
    <h2>My notes app</h2>
    <ul>
      <li>Michael O'Brien</li>
      <li>Sonja Petreska</li>
      <li>Dale Bobermien</li>
    </ul>
  </div>
)

const Login = ({ onLogin }) => {
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    onLogin('mobrien')
    navigate('/')
  }

  return (
    <div>
      {/* <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username:
          <Input />
        </div>
        <div>
          password:
          <Input type='password' />
        </div>
        <Button type='submit'>Log In</Button>
      </form> */}
      {/* Below is the version used with React Bootstrap */}
      <div>
        <h2>login</h2>
        <form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control type='text' name='username' />
            <Form.Label>Password:</Form.Label>
            <Form.Control type='password' />
            <Button variant={'success'} type='submit' style={{ marginTop: 12 }}>
              Login
            </Button>
          </Form.Group>
        </form>
      </div>
    </div>
  )
}

const App = () => {
  const [notes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: `Michael O'Brien`
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: `Michael O'Brien`
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Sonja Petreska'
    }
  ])

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`Welcome ${user}!`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const padding = {
    padding: 5
  }

  return (
    <Page className='container'>
      <Navigation>
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='#' as='span'>
                <Link style={padding} to='/'>
                  home
                </Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <Link style={padding} to='/notes'>
                  notes
                </Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <Link style={padding} to='/users'>
                  users
                </Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                {user ? (
                  <em style={padding}>{user} logged in</em>
                ) : (
                  <Link style={padding} to='/login'>
                    login
                  </Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Navigation>

      {message && <Alert variant='success'>{message}</Alert>}

      <Routes>
        <Route path='/notes/:id' element={<Note note={note} />} />
        <Route path='/notes' element={<Notes notes={notes} />} />
        <Route
          path='/users'
          element={user ? <Users /> : <Navigate replace to='/login' />}
        />
        <Route path='/login' element={<Login onLogin={login} />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer>
        <br />
        <em>Note app, Department of Computer Science 2023</em>
      </Footer>
    </Page>
  )
}

export default App
