import { useState } from "react"
import numberService from '../services/numberService'

const Form = ({ persons, setPersons, setErrorMessage, setType }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const configError = (errorMessage, errorType) => {
        setErrorMessage(errorMessage)
        setType(errorType)
        setTimeout(() => {
            setErrorMessage(null)
            setType(null)
        }, 4000)
        setNewName('')
        setNewNumber('')
    }

    const addName = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber,
        }

        if (persons.map(person => person.name).includes(newName)) {
            if (window.confirm(`${newName} already in phonebook, replace old number with new?`)) {
                const id = persons.find(p => p.name === newName).id
                numberService.update(id, newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                    })
                configError(`${newName}'s number updated`, 'success')
                }
            return
        }

        numberService
            .create(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
            })
            .catch(error => {
                configError(error.response.data.error, 'fail')
            })

        configError(`${newName} added to phonebook`, 'success')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event => {
        setNewNumber(event.target.value)
    })

    return (
        <div>
            <h2>Add new</h2>
            <form onSubmit={addName}>
                <div>
                    Name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    Number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default Form