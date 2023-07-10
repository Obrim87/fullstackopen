import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore } from 'redux'
import unicafeReducer from './reducers/unicafeReducer'
import App from './App'

const store = createStore(unicafeReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
