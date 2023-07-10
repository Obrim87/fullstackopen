import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterString(state, action) {
      return action.payload
    }
  }
})

export default filterSlice.reducer
export const { filterString } = filterSlice.actions

// Keeping the below old reducers and action creators for posterity
// These are not needed when using Redux Toolkit

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'FILTER_STRING':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const filterCreator = filter => {
//   return {
//     type: 'FILTER_STRING',
//     payload: filter
//   }
// }
