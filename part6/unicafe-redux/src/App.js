import Statistics from './components/statistics'
import { useDispatch } from 'react-redux'
import {
  increaseGood,
  increaseNeutral,
  increaseBad,
  reset
} from './reducers/unicafeReducer'

const App = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => dispatch(increaseGood())}>good</button>
      <button onClick={() => dispatch(increaseNeutral())}>neutral</button>
      <button onClick={() => dispatch(increaseBad())}>bad</button>
      <button onClick={() => dispatch(reset())}>reset</button>
      <h1>statistics</h1>
      <Statistics />
    </div>
  )
}

export default App
