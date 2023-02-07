import { useState, useEffect } from 'react'
import './index.css'
import Filter from './components/filter'
import Form from './components/contactForm'
import Contact from './components/contact'
import numberservice from './services/numbers'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [errorMessage, setErrorMessage] =useState(null)
  const [notType, setType] = useState('success')

  useEffect(() => {
    numberservice
      .getAll()
      .then(initialPerson => setPersons(initialPerson))
  }, [])

  if (!persons) {
    return null
  }

  const removePerson = (name, id) => {
    window.confirm(`Remove ${name} ?`)
    numberservice.remove(id)
    setPersons(persons.filter(p => p.id !== id))
    setType('success')
    setErrorMessage(`${name} removed form contact list.`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  return (
    <div className='main'>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} type={notType} />
      <Filter persons={persons} setPersons={setPersons} />
      <h2>Add contact</h2>
      <Form 
        persons={persons}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
        setType={setType} 
      />
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