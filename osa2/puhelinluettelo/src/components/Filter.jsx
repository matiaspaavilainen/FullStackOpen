const Filter = ({ persons, setPersons }) => {
    const handleFilter = (event) => {
        event.preventDefault()
        setPersons(persons.filter(
            person => person.name.toLowerCase().includes(
                event.target.value.toLowerCase())))
    }

    return (
        <div>
            Filter: <input onChange={handleFilter}/>
        </div>
    )
}

export default Filter