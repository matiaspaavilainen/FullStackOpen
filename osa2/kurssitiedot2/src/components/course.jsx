const Course = ({ course }) => {
    const total = course.parts.reduce((a, { exercises }) => (a + exercises), 0)

    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <p>
                Total of {total} exercises
            </p>
        </div>
    )
}

const Header = ({ name }) => (
    <div>
        <h1>
            {name}
        </h1>
    </div>
)

const Content = ({ parts }) => (
    <div>
        {parts.map(part =>
            <Part key={part.id} part={part} />)}
    </div>
)

const Part = ({ part }) => (
    <li>
        {part.name} {part.exercises}
    </li>
)

export default Course