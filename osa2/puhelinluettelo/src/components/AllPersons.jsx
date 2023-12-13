import Person from "./Person"

const AllPersons =({ persons }) => (
    <div>
        <h2>Numbers</h2>
        <ul>
            {persons.map(person =>
                <Person key={person.name} person={person} />)}
        </ul>
    </div>
)

export default AllPersons