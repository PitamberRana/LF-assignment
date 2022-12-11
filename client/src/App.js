import Home from "./components/Home";
import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Login from "./components/Login";
import Register from "./components/Register";
import patientService from "./services/patient";

function App() {
  const [patientList, setPatientList] = useState([]);

  useEffect(() => {
    patientService.getAll().then((result) => setPatientList(result));
  }, []);

  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home patientList={patientList} />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
