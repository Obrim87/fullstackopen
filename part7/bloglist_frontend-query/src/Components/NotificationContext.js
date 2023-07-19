import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return 'Log in successful!'
    case 'LOGIN_ERROR':
      return 'Log in credentials are incorrect.'
    case 'LOGOUT_SUCCESS':
      return 'You have been successfully logged out.'
    case 'ADD_BLOG_SUCCESS':
      return 'New blog added successfully!'
    case 'ADD_COMMENT_SUCCESS':
      return 'New comment added.'
    case 'LIKE_ADDED':
      return 'Like added.'
    case 'BLOG_DELETED':
      return 'Blog deleted.'
    case 'FORM_ERROR':
      return 'Please ensure all fields are filled out.'
    case 'ERROR':
      return 'Something went wrong! Please try again.'
    case 'RESET':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
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
