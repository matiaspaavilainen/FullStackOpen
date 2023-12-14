import { useState, useEffect } from 'react'


import Form from './components/Form'
import Filter from './components/Filter'
import AllPersons from './components/AllPersons'
import numberService from './services/numberService'

const App = () => {
  const [persons, setPersons] = useState([])
  
  useEffect(() => {
    numberService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter persons={persons} setPersons={setPersons} />
      <Form persons={persons} setPersons={setPersons} />
      <AllPersons persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App