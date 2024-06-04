const password = process.argv[2]
const name = process.argv[3];
const number = process.argv[4];


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








