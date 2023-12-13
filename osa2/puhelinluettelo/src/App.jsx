import { useState, useEffect } from 'react'

import axios from 'axios'

import Form from './components/Form'
import Filter from './components/Filter'
import AllPersons from './components/AllPersons'

const App = () => {
  const [persons, setPersons] = useState([])
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter persons={persons} setPersons={setPersons} />
      <Form persons={persons} setPersons={setPersons} />
      <AllPersons persons={persons} />
    </div>
  )
}

export default App