import { useState, useEffect } from 'react'
import Persons from './components/persons'
import PersonForm from './components/personForm'
import Filter from './components/filter'
import personServices from './services/persons'

const SuccessNotification = ({ message }) => {
  if (!message) return null

  return (
    <div className="success">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (!message) return null

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newTel, setNewTel] = useState()
  const [search, setSearch] = useState()
  const [successMessage, setSuccessMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()

  useEffect(() => {
    personServices.getAll()
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter setSearch={setSearch} />
      <h2>Add a new entry</h2>
      <PersonForm
        setPersons={setPersons}
        setNewName={setNewName}
        setNewTel={setNewTel}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
        persons={persons}
        newName={newName}
        newTel={newTel}
      />
      <h2>Numbers</h2>
        <Persons 
          persons={persons}
          search={search}
          setPersons={setPersons}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
        />
    </div>
  )
}

export default App