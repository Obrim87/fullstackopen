import { useContext } from 'react'
import { Table } from 'react-bootstrap'
import { UserContext } from '../App'

const Recommended = ({ allBooks }) => {
  const currentUser = useContext(UserContext)

  if (!currentUser) return

  const recommendedBooks = allBooks.data.allBooks.filter((book) =>
    book.genres.includes(currentUser.favouriteGenre)
  )

  return (
    <div>
      <h3>Recommended for you</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {recommendedBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Recommended
