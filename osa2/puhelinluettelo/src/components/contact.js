const Numbers = ({ person, removePerson }) => {
    return (
        <div>
            <p key={person.name}>
                {person.name} {person.number} <button onClick={removePerson}>
                        Remove
                    </button>
            </p>
        </div>
    )
}

export default Numbers