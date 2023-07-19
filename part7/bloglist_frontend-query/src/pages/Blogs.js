import { useState, useContext } from 'react'
import { Table, Button } from 'react-bootstrap'
import NewBlogForm from '../Components/NewBlogForm'
import Blog from '../Components/Blog'
import BlogContext from '../Components/BlogContext'

const Blogs = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [sortType, setSortType] = useState('added')
  const [blogs] = useContext(BlogContext)
  const sortedByLikes = blogs.toSorted((a, b) => b.likes - a.likes)

  const toggleSortType = () => {
    if (sortType === 'likes') return setSortType('added')
    setSortType('likes')
  }

  return (
    <div>
      {isVisible && (
        <div>
          <h2>Add a blog</h2>
          <NewBlogForm setIsVisible={setIsVisible} isVisible={isVisible} />
        </div>
      )}
      {!isVisible && (
        <div>
          <Button onClick={() => setIsVisible(!isVisible)} size={'sm'}>
            Add a blog
          </Button>
        </div>
      )}
      <div>
        <h2>All blogs</h2>
        <p>
          Sorted by:{' '}
          <Button
            type='button'
            onClick={toggleSortType}
            size={'sm'}
            variant='outline-dark'>
            {sortType === 'added' ? 'Date Added' : 'Number of Likes'}
          </Button>
        </p>
        {!blogs ? (
          <div>
            <p>Blog service not available due to server error.</p>
            <p>Please contact your system Administrator.</p>
          </div>
        ) : (
          <Table striped>
            <tbody className='allBlogs'>
              {sortType === 'added'
                ? blogs.map((blog) => (
                    <tr key={blog.id}>
                      <Blog blog={blog} />
                    </tr>
                  ))
                : sortedByLikes.map((blog) => (
                    <tr key={blog.id}>
                      <Blog blog={blog} />
                    </tr>
                  ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  )
}

export default Blogs
