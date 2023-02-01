import { useState } from "react"
import numberservice from '../services/numbers'

const Form = ({ persons, setPersons, setErrorMessage, setType }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const newPersonObj = {
            name: newName,
            number: newNumber
        }

        if (newPersonObj.name === '' || newPersonObj.number === '') {
            alert(`Fill all the fields before submitting.`)
            return
        }

        if (persons.some(x => x.name === newName)) {
            let contactToUpdate = persons.find(x => x.name === newName)
            window.confirm(`${newName} is already in the phonebook, do you want to replace the old number with a new one?`)
            numberservice
                .update(contactToUpdate.id, newPersonObj)
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.id !== contactToUpdate.id ? person : returnedPerson))
                })
                .catch(error => {
                    setType('error')
                    setErrorMessage(`${newName} does not exist.`)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 3000)
                })
            setNewName('')
            setNewNumber('')
            setErrorMessage(`${newName}'s contact updated.`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
            return
        }

        // add new person to json
        numberservice
            .add(newPersonObj)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
            })
        setErrorMessage(`${newName} added to contact list.`)
        setTimeout(() => {
            setErrorMessage(null)
        }, 3000)
    }

    return (
        <form onSubmit={addPerson}>
            <div>
                Name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                Number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default Form