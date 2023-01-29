const Filter = ({persons, setPersons}) => {

    const handleSearch = (event) => {
        setPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    return (
            <form>
                <div>
                    Search: <input onChange={handleSearch} />
                </div>
            </form>
    )
}

export default Filter