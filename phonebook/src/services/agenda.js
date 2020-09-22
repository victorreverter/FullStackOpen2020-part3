import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deletetion = (delPersonID, delPerson) => {
    return axios.delete(`${baseUrl}/${delPersonID}`, { persons: delPerson })
};

const numberUpdate = (id, newNum) => {
  // const request = axios.put(`${baseUrl}/${id}`, {name: id, number: newNum});
  // return request.then((response) => response.data);
  const request = axios.put(`${baseUrl}/${id}`, { name: id, number: newNum });
  return request.then((response) => response.data);
};

export default { getAll, create, deletetion, numberUpdate};