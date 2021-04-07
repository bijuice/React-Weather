import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({ city }) => {
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
      .then(
        response => {
          setWeather(response.data)
          console.log(response.data)
        }
      )
  }, [])

  //console.log(weather.current.temperature)

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Temperature: {weather.current.temperature} Celsius</p>
      <img src={weather.current.weather_icons[0]} alt='weather icon'></img>
      <p>Wind: {weather.current.wind_speed}MPH direction {weather.current.wind_dir}</p>
    </div>
  )
}


const Country = ({ country }) => {
  const [show, setShow] = useState(false)
  const [toShow, setToShow] = useState(0)



  if (country.length === 1) {
    return (
      <div>
        <h1>{country[0].name}</h1>
        <p> Capital: {country[0].capital}</p>
        <p> Population: {country[0].population}</p>
        <br></br>
        <h2>Languages</h2>
        <ul>
          {
            country[0].languages.map(
              language => <li key={language.name}>{language.name}</li>
            )
          }
        </ul>
        <img src={country[0].flag} alt='country flag' height={100} width={100}></img>
        <Weather city={country[0].capital} />
      </div>
    )
  }

  else if (show === true) {
    return (
      <div>
        <h1>{country[toShow].name}</h1>
        <p> Capital: {country[toShow].capital}</p>
        <p> Population: {country[toShow].population}</p>
        <br></br>
        <h2>Languages</h2>
        <ul>
          {
            country[toShow].languages.map(
              language => <li key={language.name}>{language.name}</li>
            )
          }
        </ul>
        <img src={country[toShow].flag} alt='country flag' height={100} width={100}></img>

        <Weather city={country[toShow].capital} />
      </div>
    )
  }

  else if (country.length < 10) {
    return (
      <ul>
        {country.map(
          (country, index) =>
            <li key={country.name}>{country.name} <button onClick={
              () => {
                setShow(true)
                setToShow(index)
              }
            }>show</button></li>
        )}
      </ul>
    )
  }

  else {
    return (<p>Too many matches, specify another filter</p>)

  }
}


const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const getCountries = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(getCountries, [])

  const searchChangeHandler = (event) => {
    setSearch(event.target.value)
    //console.log(search)


  }


  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))


  return (
    <div>
      find countries <input value={search} onChange={searchChangeHandler}></input>

      <Country country={countriesToShow} />

    </div>
  )
}

export default App
