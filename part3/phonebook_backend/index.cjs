const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/persons')

morgan.token('content', (req, res) => { return JSON.stringify(req.body) })

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(result =>
    res.json(result))
})

app.get('/info', (req, res) => {
  Person.find().estimatedDocumentCount().then(result => {
    res.send(`<p>Phonebook has info for ${result} people</p>
    <p>${Date()}</p>`)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(result => {
      result ? res.json(result) : res.json({ error: 'id not found' })
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(res.status(204))
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (!body.name || !body.tel) {
    return res.status(400).json(
      { error: 'content or number missing' }
    )
  }

  const person = new Person ({
    name: body.name,
    tel: body.tel,
  })

  person.save()
    .then(result => res.json(result))
    .catch(error => next(error))
  // error being thrown when less that 2 characters, but want to make it appear in frontend as well
})

app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    tel: req.body.tel
  }

  Person.findByIdAndUpdate(
    req.params.id,
    person,
    { new: true, runValidators: true, context: 'query' })
    .then(result => {
      res.json(result)
    }).catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.error('Error: ', err.message)
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'id not formatted correctly' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})