require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

const cors = require("cors")
app.use(cors())

app.use(express.json())
app.use(morgan('tiny'))

app.use(express.static('build'))

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// let persons = [{
//         "name": "Arto Hellas",
//         "number": "040-123456",
//         "id": 1
//     }, {
//         "name": "Ada lovelace",
//         "number": "39-44-5323523",
//         "id": 2
//     }, {
//         "name": "Dan Abramov",
//         "number": "12-43-234345",
//         "id": 3
//     }, {
//         "name": "Mary Poppendick",
//         "number": "39-23-6423122",
//         "id": 4
//     }
// ]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

// ----------------------------------------------------------------------

const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url =
  'mongodb+srv://qbanor:admin@cluster0.3fzty.mongodb.net/phonebook-app?retryWrites=true'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
    id: Number
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// const Person = mongoose.model('Person', personSchema)

// ----------------------------------------------------------------------

app.get('/info', (req, res) => {
    const dateData = new Date();
    let mssg = `Phonebook has info for ${persons.length} people`;
    res.send('<h3>' + mssg + '</h3> <h3>' + dateData + '</h3>')
})

// ----------------------------------------------------------------------

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// ----------------------------------------------------------------------

// app.get('/api/persons', (req, res) => {
//     res.json(persons)
// })

// app.get("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const person = persons.find((person, index) => {
//     // console.log(index);
//     // console.log(id);
//     // console.log(person);
//     // console.log(index === id);
//     // console.log(person.id, typeof person.id, id, typeof id, person.id === id);
//     return index === id;
//   });
//   console.log(person);

//   if(person !== undefined) {
//       response.json(person);
//   } else {
//     console.log("not data found");
//     response.send('<h3>Not data received</h3>').status(204).end();
//   }
// });

// ----------------------------------------------------------------------

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

// ----------------------------------------------------------------------

const generateId = () => {
    const maxId = persons.length > 0 ?
        Math.max(...persons.map(n => n.id)) :
        0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body;

    // console.log(request);
    console.log(body);

    const nameSearcher = persons.filter((person) => {
        if (person.name === body.name) {
            return response.status(400).json({
                error: 'name must be unique'
            })
        }
    })

    // console.log(nameSearcher);

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: ' missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    // console.log(person)

    // persons = persons.concat(person)

    // response.json(person)

    // ----------------------------------------------------------------------

    person.save().then(savedPerson => {
        console.log(savePerson)
        response.json(savedPerson)
    })

    // ----------------------------------------------------------------------

})

// app.post(
//   "/api/persons",
//   morgan.token('body', (req, res) => JSON.stringify(req.body))
// );

// app.delete("/api/persons/:id", (request, response) => {
// //   const id = Number(request.params.id);
// // //   notes = notes.filter((note) => note.id !== id);
// //   console.log(`DELETE '/api/persons/${id}'`);
// //   persons = persons.filter((person) => person.id !== request.params.id);

// //   response.status(204).end();

//   Person.findById(request.params.id)
//     .then(person => {
//       if (person) {
//         return response.json(person)
//       }
//       return response.status(404).end()
//     })
//     .catch(error => next(error))
// });

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// -----------------------------------------------------------------------------

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: "unknown endpoint"
  });
};

app.use(unknownEndpoint);

// -----------------------------------------------------------------------------

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError" && error.kind == "ObjectId") {
    return response.status(400).send({
      error: "malformatted id"
    });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({
      error: error.message
    });
  }

  next(error);
};

app.use(errorHandler);

// const PORT = process.env.PORT || 3001

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
