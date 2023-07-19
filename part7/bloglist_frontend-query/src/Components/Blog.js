import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  return (
    <td>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by <b>{blog.author}</b>{' '}
    </td>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
