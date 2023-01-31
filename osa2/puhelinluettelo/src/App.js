import { useState, useEffect } from 'react'
import './index.css'
import Filter from './components/filter'
import Form from './components/contactForm'
import Contact from './components/contact'
import numberservice from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    numberservice
      .getAll()
      .then(initialPerson => setPersons(initialPerson))
  }, [])

  const removePerson = (name, id) => {
    console.log({ id })
    window.confirm(`Remove ${name} ?`)
    numberservice.remove(id)
    setPersons(persons.filter(p => p.id !== id))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter persons={persons} setPersons={setPersons} />
      <h2>Add contact</h2>
      <Form persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      {persons.map(person =>
        <Contact
          key={person.name}
          person={person}
          removePerson={() => removePerson(person.name, person.id)}
        />
      )}
    </div>
  )
}

export default App