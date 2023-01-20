const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const nimi = "pekka"
  const ika = 34
  return (
    <div>
      <h1> Greetings</h1>
      <Hello name="jarkko" age={26 + 5}/>
      <Hello name={nimi} age={ika} />
    </div>
  )
  
  }

export default App