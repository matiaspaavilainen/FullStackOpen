import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  let all = good + neutral + bad
  let positive = good / all * 100
  let average = (good + bad * -1) / all
  if (all === 0) {
    return (
      <>
        <p>No feedback given.</p>
      </>
    )
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>Good:</td>
          <td>{good}</td>
        </tr><tr>
          <td>Neutral: </td>
          <td>{neutral}</td>
        </tr><tr>
          <td>Bad: </td>
          <td>{bad}</td>
        </tr><tr>
          <td>All: </td>
          <td>{all}</td>
        </tr><tr>
          <td>Average: </td>
          <td>{average.toFixed(2)}</td>
        </tr><tr>
          <td>Positive: </td>
          <td>{positive.toFixed(2)} %</td>
        </tr>
      </tbody>
    </table>
    
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <>
      <h1>Give Feedback </h1>
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App