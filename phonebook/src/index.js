import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import Filter from './Filter';
import Form from './Form';
import Persons from './Persons';
import Notification from "./Notification";
import './index.css';

import agendaService from "./services/agenda";

// import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterArr, setNewFilterArr] = useState([...persons]);
  const [notification, setNotification] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");

  useEffect(() => {
    console.log('effect');
    // axios.get("http://localhost:3001/persons").then(response => {
    //   console.log('promise fulfilled')
    //   setPersons(response.data);
    //   setNewFilterArr(response.data);
    // })
    agendaService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setNewFilterArr(initialPersons);
    });
  }, [])

  const handleFilter = (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    // console.log(persons);
    const filteredRslt = persons.filter((person) => {
      return person["name"].includes(event.target.value);
    });

    setNewFilterArr(filteredRslt);
    // console.log(filteredRslt);
  };

  const handleChangeName = (event) => {
    // console.log(event.target.value);
    // event.preventDefault();
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    // console.log(event.target.value);
    // event.preventDefault();
    setNewNumber(event.target.value);
  };

  const handleClick = (event) => {
    // console.log(...persons);
    // console.log([...persons,{name: newName}]);
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: newName,
    };


    if (persons.some((person) => person.name === newName && persons.some((person) => person.number === newNumber))) {
      
      alert(`${newName} is already added to phonebook`);

    } else if (persons.some((person) => person.name === newName) && persons.some((person) => person.number !== newNumber)) {
      
      const mssg = `${newName} is already added to phonebook but the number is different. Do you want update the number?`;
      
      if (window.confirm(mssg)){
        agendaService.numberUpdate(newName, newNumber).then((returnedDat) => {
          document.querySelector("#nameInput").value = "";
          document.querySelector("#numberInput").value = "";
          setNewName("");
          setNewNumber("");

          // console.log(persons);

          const newArr = persons.map((item) =>
            item.id === returnedDat.id
              ? { ...item, number: returnedDat.number }
              : item
          );

          // console.log(persons);
          // console.log(newArr);

          setPersons(newArr);
          setNewFilterArr(newArr);
        });

        // Added New Number Successfull
        setNotification(`The number of ${newName} has been modified`);
        setNotificationStatus("num-modified");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }

    } else {
      // console.log("didn't exists");
      document.querySelector("#nameInput").value = "";
      document.querySelector("#numberInput").value = "";
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewFilterArr([...persons, { name: newName, number: newNumber }]);

      agendaService.create(newPerson).then((returnedPersons) => {
        // console.log(returnedPersons);
        setPersons(persons.concat(returnedPersons));
        setNewName("");
        setNewNumber("");
      });

      // Added Notification Successfull
      setNotification(`Added ${newName}`);
      setNotificationStatus('successfull');
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleDelete = (id) => {
    const delItem = persons.filter((n) => n.id === id);
    const undelItem = persons.filter((n) => n.id !== id);

    const message = `Do you really want to delete ${id}?`;
    
    // window.confirm(message);

    if(window.confirm(message)) {
      // window.prompt("You failed us");
      agendaService.deletetion(id, delItem);
      setPersons(undelItem);
      setNewFilterArr(undelItem);
    }
  };

  return (
    <div className="wrap">
      <h2>Phonebook</h2>

      <Notification message={notification} status={notificationStatus} />

      <Filter filterHandle={handleFilter} />

      <h2>Add a New</h2>

      <Form
        nameHandle={handleChangeName}
        numberHandle={handleChangeNumber}
        clickHandle={handleClick}
      />

      <h2>Numbers</h2>

      <Persons personsHandled={filterArr} deleteHandle={handleDelete} />

      <div>debug: {newName}</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));