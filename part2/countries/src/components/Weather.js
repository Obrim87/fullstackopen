import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ data, weatherData, setWeatherData }) => {
  const [iconURL, setIconURL] = useState()
  const apiKey = '14924e1bfbc96cdfc9467c223bc62cbf'

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${data[0].capital[0]}&limit=1&appid=${apiKey}`)
      .then(res => {
        let locationData = res.data[0]
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=${apiKey}&units=metric`)
          .then(res => {
            setWeatherData(res.data)
            setIconURL(`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`)
          })
          .catch(error => console.error('Weather Data Error!', error))
      })
      .catch(error => console.error('Geo Location Error!', error))
  }, [])

  return (
    <div>
      <h2>Weather in {data[0].capital[0]}</h2>
      <p>Temperature: {!weatherData ? '' : weatherData.main.temp} celcius</p>
      {iconURL ? <img src={iconURL} alt="icon" /> : <div></div>}
      <p>Wind: {!weatherData ? '' : weatherData.wind.speed}m/s</p>
    </div>
  )
}

export default Weather