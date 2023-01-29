import { useState } from "react"

const Form = ({persons, setPersons}) => {
    
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
            alert(`${newName} is already in the phonebook!`)
            return
        }

        setPersons(persons.concat(newPersonObj))
        setNewName('')
        setNewNumber('')
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