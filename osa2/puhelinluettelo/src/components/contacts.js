
const Numbers = ({ persons }) => {
    return (
        persons.map(({ name, number }) => <p key={name}> {name} {number}</p>)
    )
}

export default Numbers