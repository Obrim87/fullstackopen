import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addVote(state, action) {
      return state.map(anecdote => {
        if (anecdote.id === action.payload.id) {
          return action.payload
        }
        return anecdote
      })
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { addVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

// thunk middleware async function - see docs on thunk
export const initialiseAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// thunk middleware async function - see docs on thunk
export const newAnecdote = content => {
  return async dispatch => {
    const newContent = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newContent))
  }
}

// thunk middleware async function - see docs on thunk
export const increaseVote = content => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(content)
    dispatch(addVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer

// Keeping the below old reducers and action creators for posterity
// These are not needed when using Redux Toolkit

// export const addVote = anecdote => {
//   return {
//     type: 'ADD_VOTE',
//     payload: {
//       ...anecdote
//     }
//   }
// }

// export const addAnecdote = anecdote => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       ...anecdote
//     }
//   }
// }

// const anecdotesReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'ADD_VOTE':
//       return state.map(anecdote => {
//         if (anecdote.id === action.payload.id) {
//           return {
//             ...anecdote,
//             votes: anecdote.votes + 1
//           }
//         }
//         return anecdote
//       })
//     case 'NEW_ANECDOTE':
//       return state.concat({
//         ...action.payload,
//         id: state.length + 1
//       })
//     default:
//       return state
//   }
// }
