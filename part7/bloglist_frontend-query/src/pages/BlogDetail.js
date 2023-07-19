import { useContext, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { updateBlog, deleteBlog, addComment } from '../Services/blogs'
import { useMutation, useQueryClient } from 'react-query'
import { Button, Form } from 'react-bootstrap'
import BlogContext from '../Components/BlogContext'
import NotificationContext from '../Components/NotificationContext'
import UserContext from '../Components/UserContext'

const BlogDetail = () => {
  const [comment, setComment] = useState('')
  const [blogs] = useContext(BlogContext)
  const [, dispatch] = useContext(NotificationContext)
  const [user] = useContext(UserContext)
  const { id } = useParams()
  const currentBlog = blogs.find((blog) => blog.id === id)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const addLikeMutation = useMutation(updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      dispatch({ type: 'LIKE_ADDED' })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    },
    onError: (error) => {
      console.log(error)
      dispatch({ type: 'ERROR' })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    }
  })
  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      dispatch({ type: 'BLOG_DELETED' })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    },
    onError: (error) => {
      console.log(error)
      dispatch({ type: 'ERROR' })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    }
  })

  const addCommentMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      setComment('')
      dispatch({ type: 'ADD_COMMENT_SUCCESS' })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    },
    onError: (error) => {
      console.log(error)
      dispatch({ type: 'ERROR' })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    }
  })

  if (!currentBlog) return null

  const addLike = () => {
    const updatedBlog = {
      ...currentBlog,
      likes: currentBlog.likes + 1
    }
    addLikeMutation.mutate(updatedBlog)
  }

  const handleDelete = () => {
    if (
      window.confirm(`Are you sure you want to delete '${currentBlog.title}'?`)
    ) {
      deleteBlogMutation.mutate({ user, blog: currentBlog })
      navigate('/blogs')
    }
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!comment) return
    const updatedBlog = {
      ...currentBlog,
      comments: currentBlog.comments.concat(comment)
    }
    addCommentMutation.mutate({ comments: updatedBlog, id })
  }

  return (
    <div>
      <h3>{currentBlog.title}</h3>
      <div>
        <a href={`https://${currentBlog.url}`} target='_blank' rel='noreferrer'>
          {currentBlog.url}
        </a>
        <br />
        Likes - {currentBlog.likes}{' '}
        <Button type='button' onClick={() => addLike()} size='sm'>
          Like
        </Button>
        <br />
        Added by {currentBlog.user.name} <br />
        {user.id === currentBlog.user.id && (
          <Button
            variant='danger'
            style={{ marginTop: 12 }}
            onClick={handleDelete}
            size='sm'>
            Delete
          </Button>
        )}
      </div>
      <br />
      <div>
        <h4>Comments:</h4>
        <form onSubmit={handleAddComment}>
          <Form.Group>
            <Form.Control
              name='comment'
              type='text'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='add a comment...'
            />
            <Button style={{ marginTop: 10 }} type='submit'>
              Add
            </Button>
          </Form.Group>
        </form>
        <br />
        {currentBlog.comments.map((comment) => (
          <ul key={comment}>
            <li>{comment}</li>
          </ul>
        ))}
      </div>
      <p>
        <Link to={'/blogs'}>Back</Link>
      </p>
    </div>
  )
}

export default BlogDetail
