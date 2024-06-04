const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3];
const number = process.argv[4];

const url =
  `mongodb+srv://mnazarethg:${password}@cluster0.tjhttvb.mongodb.net/?retryWrites=true&w=majority&appName=personApp`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name, 
  number: number,
})

if (process.argv.length<4) {
  Person.find({}).then(result => {
    console.log("Phonebook:")
    result.forEach(person => {
      console.log(person.name + " " + person.number)
    })
     mongoose.connection.close()
  })
} else {
  person.save().then(result => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}








