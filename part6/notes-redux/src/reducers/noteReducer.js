import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note => (note.id !== id ? note : changedNote))
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

// utilises thunk middleware which is built into configureStore API
// exports this function which returns an async function
// the async function waits to get the notes from the server then dispatches them to the store
// this is exported to App.js
export const initialiseNotes = () => {
  // thanks to thunk, the return function takes dispatch and getState as parameters
  // only dispatch is used in this case
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export default noteSlice.reducer
