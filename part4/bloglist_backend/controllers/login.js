const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  // above is destructured. Instead of:
  // const username = request.body.username
  // const password = request.body.password
  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash) // compares password in request with password in DB

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign( // creates the token
    userForToken,
    process.env.SECRET,
    //{ expiresIn: 60*60 } // sets expiry on token 60 * 60 seconds, 1hr
  )

  response
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name,
      id: user.id
    })
})

module.exports = loginRouter