import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = () => {
  const dispatch = useDispatch()

  const addNote = async event => {
    event.preventDefault()
    const content = event.target.note.value
    if (!content) return
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name='note' />
      <button type='submit'>add</button>
    </form>
  )
}

export default NewNote

// upto Asynchronous actions and Redux thunk
