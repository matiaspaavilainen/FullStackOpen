import { useState } from "react"

const Form = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addName = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber,
        }

        if (persons.map(person => person.name).includes(newName)) {
            window.alert(`${newName} is already in phonebook`)
            setNewName('')
            setNewNumber('')
            return
        }
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
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
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default Form