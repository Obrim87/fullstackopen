import { useState } from 'react'

const NewBlogForm = ({
  handleCreate,
  setIsVisible,
  isVisible,
  setNotification,
  clearNotification
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitNewBlog = e => {
    e.preventDefault()
    if (!title || !author || !url) {
      setNotification('Please ensure all fields are filled out.')
      clearNotification()
      return
    }
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    handleCreate(newBlog)
    setIsVisible(!isVisible)
  }

  return (
    <form onSubmit={submitNewBlog}>
      <label htmlFor='title'>title: </label>
      <input
        id='title'
        type='text'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br />
      <label htmlFor='author'>author: </label>
      <input
        id='author'
        type='text'
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />
      <br />
      <label htmlFor='url'>url: </label>{' '}
      <input
        id='url'
        type='text'
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <br />
      <button type='submit'>Create</button>
      <br />
      <button
        type='button'
        onClick={() => setIsVisible(!isVisible)}
      >
        Cancel
      </button>
    </form>
  )
}

export default NewBlogForm
