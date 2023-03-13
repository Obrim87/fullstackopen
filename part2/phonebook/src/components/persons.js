import personServices from '../services/persons'

const Persons = ({ persons, search, setPersons, setSuccessMessage, setErrorMessage }) => {
  let filteredPersons = persons.filter(person => 
    person.name?.toLowerCase().includes(
      search?.toLowerCase()
    )
  )

  const deleteRecord = (id) => {
    let newPersonsArr = persons.filter(p => p.id !== id)
    let deleted = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      personServices.remove(id)
        .then(() => {
          setPersons(newPersonsArr)
          setSuccessMessage(`${deleted.name} has been deleted.`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000);
        })
        .catch(error => console.log(error))
    }
  }

  if (!search)
  return (
    <>
      {persons.map(person =>
        <p key={person.name}>
          {person.name} - {person.tel} <button onClick={() => deleteRecord(person.id)}>delete</button>
        </p>
      )}
    </>
  )
  return (
    <>
      {filteredPersons.map(person =>
        <p key={person.name}>
          {person.name} - {person.tel}
        </p>
      )}
    </>
  )
}

export default Persons