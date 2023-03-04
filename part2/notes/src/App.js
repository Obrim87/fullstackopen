import Note from './components/Note'
import { useState, useEffect } from 'react'
import noteService from './services/notes'

const Notification = ({ message }) => {
  if (message === null) return null

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  // pulls JSON from local dummy server
  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const addNote = (e) => {
    e.preventDefault()
    if (newNote === '') return
    const noteObject = {
      // id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5
    }

    // posts new note to dummy server
    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
        e.target[0].value = ''
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    // updates note already stored on the dummy server
    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response.data))  
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input onChange={(e) => setNewNote(e.target.value)}/>
        <button type="submit">save</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>Switch to {showAll ? 'important' : 'all'}</button>
      <Footer />
    </div>
  )
}

export default App