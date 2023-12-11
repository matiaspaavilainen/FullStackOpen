import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  if ((good + neutral + bad) === 0) {
    return (
      <div>
        No feedback
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text='Good' value={good} />
        <StatisticsLine text='Neutral' value={neutral} />
        <StatisticsLine text='Bad' value={bad} />
        <StatisticsLine text='Average' value={((good - bad) / (good + neutral + bad)).toFixed(2)} />
        <StatisticsLine text='Positive' value={(good / (good + neutral + bad) * 100).toFixed(2)} />
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increment = (type) => {
    switch(type) {
      case 1:
        setGood(good + 1)
        break
      case 0:
        setNeutral(neutral + 1)
        break
      case -1:
        setBad(bad + 1)
        break
    }
  }

  return (
    <div>
      <h1>
        Give feedback
      </h1>
      <Button handleClick={() => increment(1)} text='Good' />
      <Button handleClick={() => increment(0)} text='Neutral' />
      <Button handleClick={() => increment(-1)} text='Bad' />
      <h1>
        Statistics
      </h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App