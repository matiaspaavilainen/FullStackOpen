import Person from "./Person"

const AllPersons =({ persons, setPersons }) => (
    <div>
        <h2>Numbers</h2>
        <ul>
            {persons.map(person =>
                <Person
                    key={person.name}
                    person={person}
                    persons={persons}
                    setPersons={setPersons}
                />
            )}
        </ul>
    </div>
)

export default AllPersons