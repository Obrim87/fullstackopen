import { useState } from 'react'

const Button = ({ clickBtn, text }) => {
  return (
    <button onClick={clickBtn}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(rng(0, anecdotes.length - 1))
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const pointsCopy = [...points]

  function rng ( min, max ) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function changeAnecdote() {
    setSelected(rng(0, anecdotes.length - 1))
  }

  function voteForAnecdote() {
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {pointsCopy[selected]} votes</p>
      <Button clickBtn={voteForAnecdote} text={'vote'} />
      <Button clickBtn={changeAnecdote} text={'next anecdote'} />
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[pointsCopy.indexOf(Math.max(...pointsCopy))]}</p>
      <p>has {Math.max(...pointsCopy)} votes</p>
    </div>
  )
}

export default App