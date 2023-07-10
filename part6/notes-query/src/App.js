import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getNotes, createNote, updateNote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const newNoteMutation = useMutation(createNote, {
    // newNote is the return value of the createNote function called above
    onSuccess: newNote => {
      console.log(newNote)
      const notes = queryClient.getQueryData('notes')
      queryClient.setQueryData('notes', notes.concat(newNote))
    }
  })
  const updateNoteMutation = useMutation(updateNote, {
    // updatedNote is the return value of the updateNote function called above
    onSuccess: updatedNote => {
      console.log(updatedNote)
      const notes = queryClient.getQueryData('notes')
      queryClient.setQueryData(
        'notes',
        notes.map(note => (note.id === updatedNote.id ? updatedNote : note))
      )
    }
  })

  const addNote = event => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
  }

  const toggleImportance = note => {
    updateNoteMutation.mutate({ ...note, important: !note.important })
  }

  const { status, data } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false
  })

  if (status === 'loading') {
    return <div>loading data...</div>
  }

  console.log('refreshed')
  const notes = data

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
      {notes.map(note => (
        <li
          key={note.id}
          onClick={() => toggleImportance(note)}
        >
          {note.content}
          <strong> {note.important ? 'important' : 'not important'}</strong>
        </li>
      ))}
    </div>
  )
}

export default App
