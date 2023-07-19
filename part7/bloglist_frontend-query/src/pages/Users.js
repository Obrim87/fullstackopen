import { useContext } from 'react'
import AllUsersContext from '../Components/AllUsersContext'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Users = () => {
  const [allUsers] = useContext(AllUsersContext)

  return (
    <div>
      <h2>Users</h2>
      {allUsers && (
        <Table striped>
          <tbody>
            <tr>
              <th>Names</th>
              <th>Blogs Added</th>
            </tr>
            {allUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default Users
