require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test' // test defined in package.json
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = { PORT, MONGODB_URI }