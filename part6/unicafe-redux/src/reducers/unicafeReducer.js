const initialState = {
  good: 0,
  neutral: 0,
  bad: 0
}

export const increaseGood = () => {
  return { type: 'GOOD' }
}

export const increaseNeutral = () => {
  return { type: 'NEUTRAL' }
}

export const increaseBad = () => {
  return { type: 'BAD' }
}

export const reset = () => {
  return { type: 'RESET' }
}

const unicafeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: state.good + 1 }
    case 'NEUTRAL':
      return { ...state, neutral: state.neutral + 1 }
    case 'BAD':
      return { ...state, bad: state.bad + 1 }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default unicafeReducer
