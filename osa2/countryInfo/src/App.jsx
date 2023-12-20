import { useState, useEffect } from "react";
import Country from "./components/country";
import countryservice from "./services/countryservice";


const App = () => {
  const [countries, setCountries] = useState([])
  const [toShow, setToShow] = useState([])

  useEffect(() => {
    countryservice.getAll()
      .then(initialcountries => {
        setCountries(initialcountries)
        setToShow(initialcountries)
      })
  }, [])

  const handleSearch = (event) => {
    const input = event.target.value.toLowerCase()
    event.preventDefault()

    const countryNames = countries.map(country => country.name.common.toLowerCase())

    if (countryNames.filter(name => name.toLowerCase().includes(input))) {
      setToShow(countries.filter(country => country.name.common.toLowerCase().includes(input)))
    }
  }
  
  return (
    <div>
      <form>
        <div>
          Find countries: <input onChange={handleSearch} />
        </div>
      </form>
      <Country countries={toShow} setToShow={setToShow} />
    </div>
  )
}
  
  export default App