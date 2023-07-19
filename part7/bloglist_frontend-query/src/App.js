import { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { getAll } from './Services/blogs'
import LoginForm from './Components/LoginForm'
import Notification from './Components/Notification'
import loginService from './Services/login'
import userService from './Services/users'
import NotificationContext from './Components/NotificationContext'
import UserContext from './Components/UserContext'
import AllUsersContext from './Components/AllUsersContext'
import BlogContext from './Components/BlogContext'
import Blogs from './pages/Blogs'
import Users from './pages/Users'
import UserDetail from './pages/UserDetail'
import BlogDetail from './pages/BlogDetail'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, dispatchNotification] = useContext(NotificationContext)
  const [user, setUser] = useContext(UserContext)
  const [, setAllUsers] = useContext(AllUsersContext)
  const [, setBlogs] = useContext(BlogContext)

  const { data } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!data) return
    setBlogs(data)
  }, [data])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
    userService.getAllUsers().then((response) => {
      setAllUsers(response)
    })
  }, [])

  const handleLogin = async (e) => {
    try {
      e.preventDefault()
      const user = await loginService.login({
        username: username,
        password: password
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      dispatchNotification({ type: 'LOGIN_SUCCESS' })
      setTimeout(() => {
        dispatchNotification({ type: 'RESET' })
      }, 5000)
    } catch (error) {
      console.log(error)
      dispatchNotification({ type: 'LOGIN_ERROR' })
      setTimeout(() => {
        dispatchNotification({ type: 'RESET' })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    dispatchNotification({ type: 'LOGOUT_SUCCESS' })
    setTimeout(() => {
      dispatchNotification({ type: 'RESET' })
    }, 5000)
  }

  const padding = {
    padding: 5
  }

  const Home = () => {
    return (
      <div>
        <h3>Welcome to BlogDepot!</h3>

        <p>
          At BlogDepot, we believe in the power of words to inspire, inform, and
          entertain. Our online platform is your one-stop destination for all
          things blogging. Whether you&apos;re a seasoned writer, a passionate
          storyteller, or someone looking to explore their creative side,
          we&apos;ve got you covered.
        </p>

        <p>
          Discover a diverse range of captivating blogs that cover a wide array
          of topics, from lifestyle and travel to technology and personal
          development. Our community of talented bloggers pours their hearts and
          minds into every post, ensuring you&apos;ll find thought-provoking
          content that resonates with you.
        </p>

        <p>
          Looking to start your own blog? We&apos;ve got you covered there too.
          Our comprehensive resources and expert tips will guide you through the
          process of creating, launching, and growing your own successful blog.
          From choosing the perfect niche to mastering the art of engaging
          writing, we&apos;re here to support you every step of the way.
        </p>

        <p>
          At BlogDepot, we foster a vibrant and inclusive community, where
          bloggers and readers can connect, share ideas, and engage in
          meaningful discussions. Leave comments, share your favourite posts on
          social media, and connect with like-minded individuals who share your
          passions.
        </p>

        <p>
          So, whether you&apos;re here to explore captivating content or embark
          on your own blogging journey, BlogDepot is your ultimate destination.
          Get ready to dive into a world of inspiration, creativity, and endless
          possibilities. Start exploring today!
        </p>

        <p>
          Happy blogging, <br />
          The BlogDepot Team
        </p>
      </div>
    )
  }

  return (
    <Router>
      <div className='container'>
        <div>
          <Link style={padding} to='/'>
            Home
          </Link>
          <Link style={padding} to='/blogs'>
            Blogs
          </Link>
          <Link style={padding} to='/users'>
            Users
          </Link>
          {user && (
            <>
              You are currently logged in as {user.username}.{' '}
              <Button className='logoutBtn' onClick={handleLogout} size='sm'>
                Logout
              </Button>
            </>
          )}
        </div>
        <h1>BlogDepot</h1>
        <h4>Unleash Your Words, Empower Your World!</h4>
        <Notification notification={notification} />
        {!user && (
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
        {user && (
          <div>
            <Routes>
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/users' element={<Users />} />
              <Route path='/users/:id' element={<UserDetail />} />
              <Route path='/blogs/:id' element={<BlogDetail />} />
              <Route path='/' element={<Home />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
