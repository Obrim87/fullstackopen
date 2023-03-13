const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://obrim:${password}@cluster0.qpuufi2.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  tel: Number,
})

const Person = mongoose.model('Person', phonebookSchema)

const person = new Person({
  name: process.argv[3],
  tel: process.argv[4],
})



if (process.argv.length === 3) {
  Person.find({})
    .then(result => {
      console.log('Phonebook:')
      result.forEach(person => {
        console.log(`${person.name}: ${person.tel}`)
      })
      mongoose.connection.close()
    })
  return
}

person.save().then(result => {
  console.log(`Added ${result.name} number ${result.tel} to phonebook`)
  mongoose.connection.close()
})