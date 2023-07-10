import { useReducer, createContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE_ADDED':
      return `Vote added to '${action.payload.content}'`
    case 'TOO_SHORT':
      return 'The anecdote is too short. It must be at least 5 characters.'
    case 'RESET':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
