import { useState, useEffect, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { Button } from 'react-bootstrap'
import { CURRENT_USER, BOOK_ADDED, ALL_BOOKS } from './queries'
import Authors from './pages/Authors'
import Books from './pages/Books'
import Login from './pages/Login'

export const TokenContext = createContext()
export const UserContext = createContext()

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Library!</h1>
      <p>
        Welcome to the digital haven of knowledge, where the boundless universe
        of literature awaits you at the click of a button! Step into our virtual
        realm and immerse yourself in the wonders of our online library, a
        treasure trove of imagination, information, and inspiration. Delight in
        the sheer diversity of genres, from classic masterpieces to contemporary
        bestsellers, as we curate a collection that caters to every inquisitive
        mind. Whether you seek adventure, romance, science, or history, our
        virtual shelves are brimming with literary gems, ready to transport you
        to new dimensions and spark your curiosity. Embrace the joy of
        exploration as you lose yourself in a world where the only limitation is
        the boundaries of your imagination.
      </p>
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState('')
  const client = useApolloClient()
  const currentUser = useQuery(CURRENT_USER)

  useEffect(() => {
    const token = localStorage.getItem('library-token')
    if (token) {
      setToken(token)
    }
    if (!currentUser.loading) {
      setUser(currentUser.data.me)
    }
  }, [currentUser])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      console.log('addedBook', addedBook)
      window.alert('A new book has been added.')
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        console.log('allBooks', allBooks)
        return {
          allBooks: allBooks.concat(addedBook)
        }
      })
    }
  })

  const handleLogout = (e) => {
    e.preventDefault()
    setToken('')
    setUser('')
    localStorage.removeItem('library-token')
    client.resetStore()
    window.location.reload()
  }

  const padding = { padding: 5 }

  return (
    <>
      <UserContext.Provider value={user}>
        <TokenContext.Provider value={token}>
          <Router>
            <div className='container'>
              <div style={{ marginTop: 15 }}>
                <Link style={padding} to={'/'}>
                  Home
                </Link>
                <Link style={padding} to={'/authors'}>
                  Authors
                </Link>
                <Link style={padding} to={'/books'}>
                  Books
                </Link>
                {!token ? (
                  <Link style={padding} to={'/login'}>
                    Log In
                  </Link>
                ) : (
                  <span style={{ marginLeft: 30 }}>
                    You are currently logged in as{' '}
                    <i>
                      <b>{user ? user.username : null}</b>
                    </i>{' '}
                    |{' '}
                    <Button
                      onClick={handleLogout}
                      size='sm'
                      variant='link'
                      style={{ paddingTop: 0, paddingLeft: 2 }}>
                      Log Out
                    </Button>
                  </span>
                )}
              </div>

              <Routes>
                <Route path='/authors' element={<Authors token={token} />} />
                <Route path='/books' element={<Books token={token} />} />
                <Route path='/login' element={<Login setToken={setToken} />} />
                <Route
                  path='/'
                  element={<Home token={token} setUser={setUser} />}
                />
              </Routes>
            </div>
          </Router>
        </TokenContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App
