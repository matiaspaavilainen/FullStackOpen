import { useState, useEffect } from 'react'
import Filter from './components/filter'
import Form from './components/contactForm'
import Numbers from './components/contacts'
import axios from 'axios'

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
      <h2>Phonebook</h2>
      <Filter persons={persons} setPersons={setPersons} />
      <h2>Add contact</h2>
      <Form persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )
}

export default App