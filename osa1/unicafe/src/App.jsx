import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

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
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>

      <p>
        Average: {(good - bad) / (good + neutral + bad)}
      </p>
      <p>
        Positive: {(good / (good + neutral + bad) * 100)} %
      </p>
    </div>
  )
}

export default App