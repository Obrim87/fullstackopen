import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const { notification, clearNotification } = notificationSlice.actions

export const setNotification = (text, timeout) => {
  return async dispatch => {
    dispatch(notification(text))
    await setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer
