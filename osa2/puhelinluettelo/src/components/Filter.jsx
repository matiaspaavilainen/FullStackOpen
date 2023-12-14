import numberService from "../services/numberService"

const Filter = ({ persons, setPersons }) => {
    const handleFilter = (event) => {
        event.preventDefault()
        setPersons(persons.filter(
            person => person.name.toLowerCase().includes(
                event.target.value.toLowerCase())))
        if (event.target.value === '') {
            numberService.getAll()
                .then(initialPersons => {
                    setPersons(initialPersons)
                })
        }
    }

    return (
        <div>
            Filter: <input onChange={handleFilter}/>
        </div>
    )
}

export default Filter