import { useState, useEffect } from 'react'
import LoginForm from './Components/LoginForm'
import NewBlogForm from './Components/NewBlogForm'
import Blog from './Components/Blog'
import Notification from './Components/Notification'
import blogService from './Services/blogs'
import loginService from './Services/login'
import userService from './Services/users'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState('')
  const [type, setType] = useState('')
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [rerender, setRerender] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [sortType, setSortType] = useState('added')
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    blogService.getAll().then(response => {
      if (sortType === 'added') return setBlogs(response)
      response.sort((a, b) => b.likes - a.likes)
      setBlogs(response)
    })
  }, [rerender, sortType])

  useEffect(() => {
    userService.getAllUsers().then(response => {
      setAllUsers(response)
    })
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      setLoggedInUser(JSON.parse(loggedInUser))
    }
  }, [])

  const clearNotification = () => {
    setTimeout(() => {
      setType('')
      setNotification('')
    }, 8000)
  }

  const handleLogin = async e => {
    try {
      e.preventDefault()
      const user = await loginService.login({
        username: username,
        password: password
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setLoggedInUser(user)
      setUsername('')
      setPassword('')
      setNotification('Login successful!')
      clearNotification()
    } catch (error) {
      setType('error')
      setNotification('Login credentials are incorrect')
      clearNotification()
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setLoggedInUser(null)
    setNotification('You have been successfully logged out')
    clearNotification()
  }

  const handleCreate = async newBlog => {
    try {
      await blogService.newBlog(newBlog, loggedInUser.token)
      setRerender(!rerender)
      setNotification('New blog added successfully!')
      clearNotification()
    } catch (error) {
      console.log(error)
      setType('error')
      setNotification(error.message)
      clearNotification()
    }
  }

  const increaseLikes = async updatedBlog => {
    try {
      await blogService.updateBlog(updatedBlog)
      setRerender(!rerender)
      setNotification('Like added.')
      clearNotification()
    } catch (error) {
      console.log(error)
      setType('error')
      setNotification(error.message)
      clearNotification()
    }
  }

  const toggleSortType = () => {
    sortType === 'added' ? setSortType('likes') : setSortType('added')
  }

  const deleteBlog = async (user, blog) => {
    try {
      await blogService.deleteBlog(blog, user.token)
      setRerender(!rerender)
      setNotification('Blog deleted.')
      clearNotification()
    } catch (error) {
      console.log(error)
      setType('error')
      setNotification(error.message)
      clearNotification()
    }
  }

  return (
    <div>
      <h1>Welcome to BlogDepot!</h1>
      <Notification
        message={notification}
        type={type}
      />
      {!loggedInUser && (
        <div>
          <h2>Log in to see blogs</h2>
          {
            <LoginForm
              handleLogin={handleLogin}
              setUsername={setUsername}
              setPassword={setPassword}
              username={username}
              password={password}
            />
          }
        </div>
      )}
      {loggedInUser && (
        <div>
          <p>
            You are currently logged in as {loggedInUser.username}.{' '}
            <button
              className='logoutBtn'
              onClick={handleLogout}
            >
              Logout
            </button>
          </p>
          {isVisible && (
            <div>
              <h2>Add a blog</h2>
              <NewBlogForm
                handleCreate={handleCreate}
                setIsVisible={setIsVisible}
                isVisible={isVisible}
                setNotification={setNotification}
                clearNotification={clearNotification}
              />
            </div>
          )}
          {!isVisible && (
            <div>
              <button onClick={() => setIsVisible(!isVisible)}>
                Add a blog
              </button>
            </div>
          )}
          <div>
            <h2>All blogs</h2>
            <p>
              Sort by:{' '}
              <button
                type='button'
                onClick={() => toggleSortType()}
              >
                {sortType === 'added' ? 'Date Added' : 'Number of Likes'}
              </button>
            </p>
            <div className='allBlogs'>
              {blogs.map(blog => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  loggedInUser={loggedInUser}
                  increaseLikes={increaseLikes}
                  deleteBlog={deleteBlog}
                  allUsers={allUsers}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
