import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './reducers/filterReducer'
import anecdotesSlice from './reducers/anecdoteReducer'
import notificationSlice from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesSlice,
    filter: filterSlice,
    notification: notificationSlice
  }
})

export default store
