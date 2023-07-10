import { configureStore } from '@reduxjs/toolkit'
import noteSlice from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteSlice,
    filter: filterReducer
  }
})

export default store
