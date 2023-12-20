import numberService from "../services/numberService"

const Person = ({ person, persons, setPersons, setErrorMessage, setType }) => {
    const handleRemove = (id) => {
        if (window.confirm(`Do you want to delete ${person.name} from phonebook`)) {
            numberService.remove(id)
                .catch(error => {
                    setType('fail')
                    setErrorMessage(`${person.name} already removed`)
                    setTimeout(() => {
                        setErrorMessage(null)
                        setType(null)
                    }, 3000)
                })
            
            setType('success'),
                setErrorMessage(`${person.name} removed from phonebook`),
                setTimeout(() => {
                    setErrorMessage(null)
                    setType(null)
                }, 3000)
            setPersons(persons.filter(p => p.id !== id))
        }
    }
    return (
        <li>
            {person.name} {person.number}
            <button onClick={() => handleRemove(person.id)}>Remove</button>
        </li>
    )
}

export default Person