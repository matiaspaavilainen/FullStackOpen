import Person from "./Person"

const AllPersons =({ persons, setPersons, setErrorMessage, setType }) => (
    <div>
        <h2>Numbers</h2>
        <ul>
            {persons.map(person =>
                <Person
                    key={person.name}
                    person={person}
                    persons={persons}
                    setPersons={setPersons}
                    setErrorMessage={setErrorMessage}
                    setType={setType}
                />
            )}
        </ul>
    </div>
)

export default AllPersons