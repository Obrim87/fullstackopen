import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import noteService from '../services/notes'

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(({ filter, notes }) => {
    switch (filter) {
      case 'ALL':
        return notes
      case 'IMPORTANT':
        return notes.filter(note => note.important)
      default:
        return notes.filter(note => !note.important)
    }
  })

  const toggleImportance = note => {
    const updatedNote = {
      ...note,
      important: !note.important
    }
    noteService.toggleImportance(updatedNote)
    dispatch(toggleImportanceOf(updatedNote.id))
  }

  return (
    <ul>
      {notes.map(note => (
        <li
          key={note.id}
          onClick={() => toggleImportance(note)}
        >
          {note.content}{' '}
          <strong>{note.important ? 'important' : 'not important'} </strong>
          &lt;--- click to toggle
        </li>
      ))}
    </ul>
  )
}

export default Notes
// upto exercise 6.9
