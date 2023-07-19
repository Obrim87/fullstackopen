import { useState } from 'react'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button,
  Alert,
  AppBar,
  Toolbar
} from '@mui/material'
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch
} from 'react-router-dom'

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
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>{note.user}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <TextField label='username' />
        </div>
        <div>
          <TextField label='password' type='password' />
        </div>
        <div>
          <Button variant='contained' color='primary' type='submit'>
            login
          </Button>
        </div>
      </form>
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

  return (
    <Container>
      <div className='container'>
        <AppBar position='static'>
          <Toolbar>
            <Button color='inherit' component={Link} to='/'>
              home
            </Button>
            <Button color='inherit' component={Link} to='/notes'>
              notes
            </Button>
            <Button color='inherit' component={Link} to='/users'>
              users
            </Button>
            {user ? (
              <em>{user} logged in</em>
            ) : (
              <Button color='inherit' component={Link} to='/login'>
                login
              </Button>
            )}
          </Toolbar>
        </AppBar>

        {message && <Alert severity='success'>{message}</Alert>}

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
        <footer>
          <br />
          <em>Note app, Department of Computer Science 2023</em>
        </footer>
      </div>
    </Container>
  )
}

export default App