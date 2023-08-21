import { useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'
import { Button, Table } from 'react-bootstrap'
import BookForm from '../components/BookForm'
import Recommended from '../components/Recommended'
import Select from 'react-select'
import { useState, useContext } from 'react'
import { TokenContext } from '../App'

const Books = () => {
  const allBooks = useQuery(ALL_BOOKS)
  const token = useContext(TokenContext)
  const [selectedGenre, setSelectedGenre] = useState('')
  const [showBookForm, setShowBookForm] = useState(false)
  const booksByGenre = useQuery(BOOKS_BY_GENRE, {
    variables: selectedGenre ? { genre: selectedGenre.value } : null
  })

  if (allBooks.loading || booksByGenre.loading) return <div>Loading...</div>

  // extracts a list of all genres from allBooks for dropdown menu
  const allGenres = allBooks.data.allBooks.flatMap((book) => book.genres)
  const options = Array.from(new Set(allGenres)).map((genre) => ({
    value: genre,
    label: genre
  }))

  return (
    <div>
      <h3>Books</h3>
      {!token ? (
        <p>You must be logged in to add books to the library.</p>
      ) : showBookForm ? (
        <BookForm
          setShowBookForm={setShowBookForm}
          showBookForm={showBookForm}
          selectedGenre={selectedGenre}
        />
      ) : (
        <Button
          onClick={() => setShowBookForm(!showBookForm)}
          style={{ marginBottom: 10 }}>
          Add a book
        </Button>
      )}
      <Recommended allBooks={allBooks} />
      <h3>All books</h3>
      <Select
        options={options}
        onChange={setSelectedGenre}
        placeholder={'filter by genre...'}
        isClearable={true}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        {!selectedGenre ? (
          <tbody>
            {allBooks.data.allBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {booksByGenre.data.allBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </div>
  )
}

export default Books
