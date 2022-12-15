import Home from "./components/Home";
import React, { useEffect } from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Login from "./components/Login";
import Register from "./components/Register";
import PatientDetail from "./components/PatientDetail";
import { getPatient } from "./reducers/patientReducer";
import { useDispatch } from "react-redux";
import { loginUser } from "./reducers/userReducer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatient());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/id" element={<PatientDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
