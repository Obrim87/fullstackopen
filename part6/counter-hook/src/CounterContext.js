import { createContext, useReducer } from 'react'

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1
    case 'DEC':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

// context created
const CounterContext = createContext()

// this provider is exported to index.js
export const CounterContextProvider = (props) => {
  // reducer defined here
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    // all children can use the context (used in index.js)
    <CounterContext.Provider value={[counter, counterDispatch]}>
      {props.children}
    </CounterContext.Provider>
  )
}

export default CounterContext
