import { useState, useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { newBlog } from '../Services/blogs'
import { Form, Button } from 'react-bootstrap'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'

const NewBlogForm = ({ setIsVisible, isVisible }) => {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [, dispatch] = useContext(NotificationContext)
  const [user] = useContext(UserContext)

  const newBlogMutation = useMutation(newBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
    onError: (error) => {
      console.log(error)
      dispatch({ type: 'ERROR' })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    }
  })

  const createNewBlog = (e) => {
    e.preventDefault()
    if (!title || !author || !url) {
      dispatch({ type: 'FORM_ERROR' })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
      return
    }
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    newBlogMutation.mutate({ newBlog, token: user.token })
    setIsVisible(!isVisible)
  }

  return (
    <form onSubmit={createNewBlog}>
      <Form.Group>
        <Form.Label htmlFor='title'>Title: </Form.Label>
        <Form.Control
          name='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <Form.Label htmlFor='author'>Author: </Form.Label>
        <Form.Control
          name='author'
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        <Form.Label htmlFor='url'>URL: </Form.Label>{' '}
        <Form.Control
          name='url'
          type='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <Button type='submit'>Create</Button>
        <Button
          variant='secondary'
          onClick={() => setIsVisible(!isVisible)}
          style={{ marginLeft: 10 }}>
          Cancel
        </Button>
      </Form.Group>
    </form>
  )
}

export default NewBlogForm
