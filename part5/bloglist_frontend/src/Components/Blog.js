import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, loggedInUser, increaseLikes, deleteBlog, allUsers }) => {
  const [showDetails, setShowDetails] = useState(false)

  const addLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      blogId: blog.id
    }
    increaseLikes(updatedBlog)
  }

  const confirmDelete = () => {
    if (window.confirm(`Are you sure you want to delete '${blog.title}'?`)) {
      deleteBlog(loggedInUser, blog)
    }
  }

  return (
    <>
      {showDetails && (
        <div className='blog'>
          {blog.title} by <b>{blog.author}</b>{' '}
          <button
            type='button'
            onClick={() => setShowDetails(!showDetails)}
          >
            Hide Details
          </button>
          <br />
          {blog.url}
          <br />
          Likes - {blog.likes}{' '}
          <button
            type='button'
            onClick={() => addLike()}
          >
            Like
          </button>
          <br />
          Added by: {allUsers.find(user => blog.user.id === user.id).name}
          <br />
          {blog.user.id === loggedInUser.id && (
            <button
              className='delete'
              type='button'
              onClick={() => confirmDelete()}
            >
              Delete
            </button>
          )}
        </div>
      )}
      {!showDetails && (
        <div className='blog'>
          {blog.title} by <b>{blog.author}</b>{' '}
          <button
            type='button'
            onClick={() => setShowDetails(!showDetails)}
          >
            View Details
          </button>
        </div>
      )}
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  increaseLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  allUsers: PropTypes.array.isRequired
}

export default Blog
