import { useState } from 'react'

function Display ({ counter }) {
  return (
    <div>{counter}</div>
  )
}

function Button ({ onClick, text }) {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0)
  const [ bool, setBool] = useState(true)
  let string = `${bool}`

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)
  const changeBool = () => {
    (bool) ? setBool(false) : setBool(true)
  }

  return (
    <div>
      <Display counter={counter} />
      <Display counter={string} />
      <Button onClick={increaseByOne} text='plus' />
      <Button onClick={setToZero} text='zero' />
      <Button onClick={decreaseByOne} text='minus' />
      <Button onClick={changeBool} text='boolean' />
    </div>
  )
}

export default App