import numberService from "../services/numberService"

const Person = ({ person, persons, setPersons }) => {
    const handleRemove = (id) => {
        if (window.confirm(`Do you want to delete ${person.name} from phonebook`)) {
            numberService.remove(id)
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