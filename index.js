const express = require('express')
const app = express()
// CONTINUAR EJERCICIOS 3C!
var morgan = require('morgan')

app.use(morgan('tiny'))

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
  });
  
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
     number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/info', (request, response) => {
response.send(
    `<p>Ponhebook has info for ${persons.length} people</p>
     <p>${Date()}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).send("HTTP ERROR 404")
    }
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
app.post('/api/persons', (request, response) => {
const body = request.body
console.log(body)

if (!body.name || !body.number) {
    return response.status(400).json({ 
    error: 'name or number missing' 
    })
} 
const existingPerson = persons.find(person => person.number === body.number);
if (existingPerson) {
    return response.status(400).json({ 
        error: 'name must be unique' 
    });
}

const person = {
    name: body.name,
    number: body.number || false,
    id: generateId(),
}

persons = persons.concat(person)

response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
const id = Number(request.params.id)
const person = persons.filter(person => person.id !== id)
if (person) {
    response.status(200).end()
} else {
    response.status(204).send("HTTP ERROR 204")
    }
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})