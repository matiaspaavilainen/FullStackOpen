const Header = ({ name }) => {
    return (
        <>
            <h2>
                {name}
            </h2>
        </>
    )
}


const Content = ({ parts }) => {
    return (
        parts.map(({ name, exercises, id }) => {
            return (
                <p key={id}>{name} {exercises}</p>
            )
        })
    )
}


const Total = ({ parts }) => {
    return (
        <h4>
            Total exercises: {parts.reduce((sum, exercise) => sum + exercise.exercises, 0)}
        </h4>
    )
}


const Course = ({ courses }) => {
    return (
        courses.map(({ name, parts, id }) => {
            return (
                <div key={id}>
                    <Header name={name} />
                    <Content parts={parts} />
                    <Total parts={parts} />
                </div>
            )
        })
    )
}

export default Course