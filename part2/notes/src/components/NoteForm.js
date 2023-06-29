import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    if (newNote === '') return
    createNote({
      content: newNote,
      important: true
    })
    setNewNote('')
  }

  return (
    <form onSubmit={addNote}>
      <input
        placeholder={'enter your note here'}
        onChange={(event) => setNewNote(event.target.value)}
        value={newNote}
        id='note-input'
      />
      <button type="submit">Save note</button>
    </form>
  )
}

export default NoteForm