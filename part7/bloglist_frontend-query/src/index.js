import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationContextProvider } from './Components/NotificationContext'
import { UserContextProvider } from './Components/UserContext'
import { AllUsersContextProvider } from './Components/AllUsersContext'
import { BlogContextProvider } from './Components/BlogContext'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <BlogContextProvider>
    <AllUsersContextProvider>
      <UserContextProvider>
        <NotificationContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </NotificationContextProvider>
      </UserContextProvider>
    </AllUsersContextProvider>
  </BlogContextProvider>
)
