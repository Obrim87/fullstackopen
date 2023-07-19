import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  // pulls JSON from local dummy server
  useEffect(() => {
    ;(async () => {
      const response = await noteService.getAll()
      setNotes(response)
    })()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = async note => {
    // posts new note to server
    try {
      const response = await noteService.create(note)
      setNotes(notes.concat(response.data))
      noteFormRef.current.toggleVisibility()
    } catch (error) {
      const message = error.response.data.error
      console.log(error)
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = async id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    // updates note already stored on the server
    try {
      const response = await noteService.update(id, changedNote)
      setNotes(notes.map(note => (note.id !== id ? note : response.data)))
    } catch (error) {
      console.log(error)
      setErrorMessage(`Note '${note.content}' was already removed from server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    }
  }

  const handleLogin = async loginDetails => {
    try {
      const user = await loginService.login(loginDetails)
      // stores the user object locally
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
    } catch (error) {
      setErrorMessage('Wrong credentials.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    noteService.setToken(null)
    setUser(null)
    setErrorMessage('You have been successfully logged out.')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {!user && (
        <Togglable buttonLabel={'Log in'}>
          <p>Please use the form below to log in</p>
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      )}
      {user && (
        <div>
          <p>
            You are currently logged in as {user.username}.{' '}
            <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable
            buttonLabel={'Add a note'}
            ref={noteFormRef}
          >
            <NoteForm createNote={addNote} />
          </Togglable>
          <br />
        </div>
      )}
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? 'important only' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App
