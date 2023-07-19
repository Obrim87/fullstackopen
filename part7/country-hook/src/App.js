import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((response) => setCountry(response))
      .catch((error) => {
        console.log(error)
        setCountry(error.response.data.error)
      })
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country === 'not found') {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.data.name.official}</h3>
      <div>Capital city: {country.data.capital[0]} </div>
      <div>Population: {country.data.population}</div>
      <img
        src={country.data.flags.png}
        height='100'
        alt={country.data.flags.alt}
      />
    </div>
  )
}

const App = () => {
  const [name, setName] = useState('')
  const nameInput = useField('text')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
