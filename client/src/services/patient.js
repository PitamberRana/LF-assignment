import axios from "axios";
const baseUrl = "/patientList";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const token = JSON.parse(window.localStorage.getItem("loggedinUser")).token;
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const request = axios.post(baseUrl, newObject, config);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};
export default {
  getAll,
  create,
  update,
  remove,
  // setToken,
};
