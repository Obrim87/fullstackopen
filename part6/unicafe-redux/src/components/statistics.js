import { useSelector } from 'react-redux'

const Statistics = () => {
  const stats = useSelector(stats => {
    return stats
  })
  if (!stats) return <p>undefined</p>
  const { good, neutral, bad } = stats
  const average = () => {
    if (good + bad + neutral === 0) return 0
    return Math.round(((good - bad) / (good + bad + neutral)) * 100) / 100
  }
  const positive = () => {
    if (good + bad + neutral === 0) return 0
    return Math.round((good / (good + bad + neutral)) * 100 * 100) / 100 + '%'
  }

  const StatisticLine = ({ numOfClicks, text }) => {
    return (
      <tr>
        <td>{text}</td>
        <td>{numOfClicks}</td>
      </tr>
    )
  }
  //if (good + bad + neutral === 0) return <p>No feedback given</p>
  return (
    <div>
      <div className='App'>
        <table>
          <tbody>
            <StatisticLine
              numOfClicks={good}
              text={'good'}
            />
            <StatisticLine
              numOfClicks={neutral}
              text={'neutral'}
            />
            <StatisticLine
              numOfClicks={bad}
              text={'bad'}
            />
            <StatisticLine
              numOfClicks={good + bad + neutral}
              text={'submissions'}
            />
            <StatisticLine
              numOfClicks={average()}
              text={'average'}
            />
            <StatisticLine
              numOfClicks={positive()}
              text={'positive'}
            />
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Statistics
