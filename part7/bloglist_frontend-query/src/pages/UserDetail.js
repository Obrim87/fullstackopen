import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import AllUsersContext from '../Components/AllUsersContext'

const UserDetail = () => {
  const [allUsers] = useContext(AllUsersContext)
  const { id } = useParams()
  const currentUser = allUsers.find((user) => user.id === id)
  if (!currentUser) return null
  return (
    <div>
      <h2>{currentUser.name}</h2>
      <br />
      <h3>Added Blogs:</h3>
      <br />
      {currentUser.blogs.length === 0 ? (
        <div>
          <p>No blogs added by this user.</p>
        </div>
      ) : (
        <div>
          {currentUser.blogs.map((blog) => (
            <ul key={blog.id}>
              <li>
                {blog.title} by <b>{blog.author}</b>
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserDetail
