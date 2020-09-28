const express = require('express')
const app = express()

app.use(express.json())

let persons = [{
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    }, {
        "name": "Ada lovelace",
        "number": "39-44-5323523",
        "id": 2
    }, {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    }, {
        "name": "Mary Poppendick",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    const dateData = new Date();
    let mssg = `Phonebook has info for ${persons.length} people`;
    res.send('<h3>' + mssg + '</h3> <h3>' + dateData + '</h3>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person, index) => {
    // console.log(index);
    // console.log(id);
    // console.log(person);
    // console.log(index === id);
    // console.log(person.id, typeof person.id, id, typeof id, person.id === id);
    return index === id;
  });
  console.log(person);
  
  if(person !== undefined) {
      response.json(person);      
  } else {
    console.log("not data found");
    response.send('<h3>Not data received</h3>').status(204).end();
  }
});

const generateId = () => {
    const maxId = persons.length > 0 ?
        Math.max(...persons.map(n => n.id)) :
        0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body;

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
            error: 'name missing'
        })
    }

    
    
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    // console.log(person)

    persons = persons.concat(person)

    response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
//   notes = notes.filter((note) => note.id !== id);
  console.log(`DELETE '/api/persons/${id}'`);
  persons = persons.filter((person) => person.id !== request.params.id);

  response.status(204).end();
});

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
