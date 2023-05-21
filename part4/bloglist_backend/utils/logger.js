const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') { // stops console logging in test mode
    console.log(...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') { // stops error logging in test mode
    console.error(...params)
  }
}

module.exports = { info, error }