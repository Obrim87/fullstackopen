import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, BOOKS_BY_GENRE } from '../queries'

const BookForm = ({ setShowBookForm, showBookForm, selectedGenre }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    update: (cache, response) => {
      // first param is the query you want to update (including options)
      // second param is an update function, which is passed the cached 'data'
      cache.updateQuery(
        {
          query: BOOKS_BY_GENRE,
          variables: selectedGenre ? { genre: selectedGenre.value } : null
        },
        (data) => {
          // it returns a copy of the object with the new data (found in response param), appended
          return { allBooks: data.allBooks.concat(response.data.addBook) }
        }
      )
    },
    onCompleted: () => {
      setTitle('')
      setAuthor('')
      setPublished('')
      setGenre('')
      setGenres([])
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const submit = (e) => {
    e.preventDefault()
    if (!title || !author || !published || !genres)
      return alert('Please fill out all fields')
    addBook({
      variables: { title, author, published: Number(published), genres }
    })
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h3>Add a book</h3>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type='text'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type='text'
            name='author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Form.Label>Published:</Form.Label>
          <Form.Control
            type='number'
            name='published'
            value={published}
            onChange={(e) => setPublished(e.target.value)}
          />
          <div
            className='d-flex'
            style={{ width: 400, marginTop: 10, marginBottom: 10 }}>
            <Form.Control
              type='text'
              name='genre'
              placeholder='enter single genre here'
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <Button style={{ marginLeft: 10 }} onClick={addGenre}>
              Add
            </Button>
          </div>
          <Form.Label>Genres:</Form.Label>
          <div>{genres.join(', ')}</div>
          <Button style={{ marginTop: 10, marginBottom: 10 }} type='submit'>
            Create Book
          </Button>
          <Button
            style={{ margin: 10 }}
            onClick={() => setShowBookForm(!showBookForm)}
            variant='secondary'>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BookForm
