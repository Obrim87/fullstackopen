import { useState } from 'react'

const Button = ({ click, text }) => {
  return (
    <button onClick={click}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad, average, positive }) => {
  if (good + bad + neutral === 0) return <p>No feedback given</p>
  return (
    <div> 
    <div className="App">
        <table>
          <tbody>
            <StatisticLine numOfClicks={good} text={'good'} />
            <StatisticLine numOfClicks={neutral} text={'neutral'} />
            <StatisticLine numOfClicks={bad} text={'bad'} />
            <StatisticLine numOfClicks={good + bad + neutral} text={'submissions'} />
            <StatisticLine numOfClicks={average()} text={'average'} />
            <StatisticLine numOfClicks={positive()} text={'positive'} />
          </tbody>
        </table>
      </div>
    </div>
  )
}

const StatisticLine = ({ numOfClicks, text }) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{numOfClicks}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClicked = () => {
    setGood(good + 1)
  }
  const neutralClicked = () => {
    setNeutral(neutral + 1)
  }
  const badClicked = () => {
    setBad(bad + 1)
  }
  const reset = () => {
    setGood(0)
    setNeutral(0)
    setBad(0)
  }
  const average = () => {
    if (good + bad + neutral === 0) return 0
    return Math.round((good - bad) / (good + bad + neutral) * 100) / 100
  }
  const positive = () => {
    if (good + bad + neutral === 0) return 0
    return Math.round(((good / (good + bad + neutral)) * 100) * 100) / 100 + '%'
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button click={goodClicked} text={'good'} />
      <Button click={neutralClicked} text={'neutral'} />
      <Button click={badClicked} text={'bad'} />
      <Button click={reset} text={'reset'} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} average={average} positive={positive} />
    </div>
    
  )
}

export default App