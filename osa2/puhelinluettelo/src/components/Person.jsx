import {remove} from '../services/numbers'

const Person = ({ person }) => {
    const handleRemove = (id) => {
        numbers.remove(id)
            .then()
    }
    return (
        <li>
            {person.name} {person.number}
        </li>
    )
}

export default Person