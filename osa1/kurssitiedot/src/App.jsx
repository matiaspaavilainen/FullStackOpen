const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name}: {props.count}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.course[0].name} count={props.course[0].exercises} />
      <Part name={props.course[1].name} count={props.course[1].exercises} />
      <Part name={props.course[2].name} count={props.course[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  let sum = 0
  props.exercises.forEach(num => {
    sum += num.exercises
  })
  
  return (
    <div>
      <p>
        Number of exercises: {sum}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack Application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course.parts} />
      <Total exercises={course.parts} />
    </div>
  )
}

export default App