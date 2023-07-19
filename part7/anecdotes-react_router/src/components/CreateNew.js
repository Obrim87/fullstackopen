import { useField } from '../hooks'

const CreateNew = ({ addNew }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.value || !author.value || !info.value) return
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const resetFields = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content: <input {...content} />
        </div>
        <div>
          Author: <input {...author} />
        </div>
        <div>
          URL: <input {...info} />
        </div>
        <button style={{ marginTop: 10 }} type='submit'>
          Create
        </button>
        <button style={{ marginLeft: 10 }} onClick={resetFields}>
          Reset
        </button>
      </form>
    </div>
  )
}

export default CreateNew
