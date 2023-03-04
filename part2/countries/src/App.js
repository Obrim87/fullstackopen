import { useState, useEffect } from 'react'
import axios from 'axios'
import SingleResult from './components/SingleResult'
import MultipleResults from './components/MultipleResults'
import Weather from './components/Weather'

function App() {
  const [countries, setCountries] = useState([])
  const [data, setData] = useState([])
  const [weatherData, setWeatherData] = useState()

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Country API Error!', error))
  }, [])
  
  const filter = (e) => {
    let filteredData = countries.filter(c => c.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
      setData(filteredData)
  }

  return (
    <div>
      Find Countries: <input type="text" onChange={filter}  />
      {data.length === 1 
        ? <>
            <SingleResult data={data} />
            <Weather 
              data={data} 
              weatherData={weatherData} 
              setWeatherData={setWeatherData}
            />
          </>
        : <MultipleResults data={data} setData={setData}/>}
      
    </div>
  )
}

export default App;