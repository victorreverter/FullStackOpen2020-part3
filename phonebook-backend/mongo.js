const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

// mongodb + srv: //qbanor:<password>@cluster0.3fzty.mongodb.net/<dbname>?retryWrites=true&w=majority

const url = `mongodb+srv://qbanor:${password}@cluster0.3fzty.mongodb.net/phonebook-app?retryWrites=true`

// mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
// })

mongoose.connect(url, {
    useNewUrlParser: true
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

const Person = mongoose.model('Person', personSchema)

const generateId = () => {
    return Math.round(Math.random() * 10000)
}

if (process.argv.length === 5) {
    const person = new Person({
        name: name,
        number: number,
        id: generateId()
    })

    person.save().then(response => {
        console.log(`added ${name} number ${number}`);
        mongoose.connection.close();
    })
}

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

// const person = new Person({
//     name: "Julian",
//     number: 9998262,
//     id: "Julian"
// })

// person.save().then(result => {
//     console.log(result);
//     console.log('person saved!')
//     mongoose.connection.close()
// })

// Person.find({}).then(result => {
//     result.forEach(person => {
//         console.log(person)
//     })
//     mongoose.connection.close()
// })