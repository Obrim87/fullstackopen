import { useState, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { Table, Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import { TokenContext } from '../App'

const Authors = () => {
  const token = useContext(TokenContext)
  const allAuthors = useQuery(ALL_AUTHORS, {
    onError: (error) => {
      console.log(error)
    }
  })
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [born, setBorn] = useState('')
  const [updateBirthyear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  if (allAuthors.loading) return <div>Loading...</div>

  const options = allAuthors.data.allAuthors.map((author) => ({
    value: author.name,
    label: author.name
  }))

  const submit = (e) => {
    e.preventDefault()
    updateBirthyear({
      variables: { name: selectedAuthor.value, setBornTo: Number(born) }
    })
    setBorn('')
  }

  return (
    <div>
      <h3>Authors</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {allAuthors.data.allAuthors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <h3>Set Birthyear</h3>
        {!token ? (
          <div>You must be logged in to edit birth years.</div>
        ) : (
          <Form onSubmit={submit}>
            <Select options={options} onChange={setSelectedAuthor} />
            <Form.Control
              type='text'
              name='title'
              value={born}
              placeholder='enter new birthyear'
              onChange={(e) => setBorn(e.target.value)}
              style={{ width: 200 }}
            />
            <Button type='submit'>Change</Button>
          </Form>
        )}
      </div>
    </div>
  )
}

export default Authors
