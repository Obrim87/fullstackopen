import personServices from '../services/persons'

const PersonForm = ({ setPersons, setNewName, setNewTel, setSuccessMessage, setErrorMessage, persons, newName, newTel }) => {
  const addName = (e) => {
    e.preventDefault()
    if (!newName || !newTel) {
      setErrorMessage('You must enter a name and number')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
      return
    }
    let nameObject = {
      name: newName,
      tel: newTel
    }
    // checks if the name already exists and asks if you want to update
    if (persons.find(p => p.name.toLowerCase() === nameObject.name.toLowerCase())) {
      if (window.confirm(`${nameObject.name} already exists, do you wish to update the phone number?`)) {
        let changedPerson = persons.find(p => p.name.toLowerCase() === nameObject.name.toLowerCase())
        changedPerson.tel = nameObject.tel
        personServices.update(changedPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(p => p.name.toLowerCase() === response.data.name.toLowerCase() ? response.data : p))
            setSuccessMessage(`${response.data.name} has been updated.`)    
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000);
          })
          .catch(error => {
            if (error.response.status === 404) {
              setErrorMessage(`Information on ${changedPerson.name} has already been removed from the server.`)
            } else if (error.response.status === 400) {
              setErrorMessage(error.response.data.error)
            }
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000); 
          })
      }
      return
    }

    // if the name is unique, sends it to the backend and updates the front end
    personServices.create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setSuccessMessage(`${response.data.name} has been added.`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000);
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
  }

  return (
    <form>
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)} /><br></br><br></br>
          number: <input onChange={(e) => setNewTel(e.target.value)} /><br></br><br></br>
          <button 
            type="submit"
            onClick={addName}>{(persons.find(e => 
              e.name.toLowerCase() === newName.toLowerCase()) 
              ? 'update'
              : 'add'
            )}
          </button>
        </div>
    </form>
  )
}

export default PersonForm