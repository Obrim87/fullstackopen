import { useState } from 'react'

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {allClicks.join(' ')}
    </div>
  )
}

const Display = ({value}) => <div>{value}</div>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [ left, setLeft ] = useState(0)
  const [ right, setRight ] = useState(0)
  const [ allClicks, setAll ] = useState([])
  const [ total, setTotal ] = useState(0)
  const [ value, setValue ] = useState(69)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right) 
    const updatedValue = value + 1
    setValue(updatedValue)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
    const updatedValue = value - 1
    setValue(updatedValue)
  }

  const resetToZero = () => {
    setAll([])
    setLeft(0)
    setRight(0)
    setTotal(0)
    setValue(69)
  }

  return (
    <div>
      <Display value={value} />
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={resetToZero} text='reset' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <p><History allClicks={allClicks}/></p>
      <p>total {total}</p>
    </div>
  )
}


export default App