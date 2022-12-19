import Home from "./components/Home";
import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Login from "./components/Login";
import Register from "./components/Register";
import PatientDetail from "./components/PatientDetail";
import { getPatient, removePatient } from "./reducers/patientReducer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";

function App() {
  const [msg, setMsg] = useState(null);
  const [severity, setSeverity] = useState("");

  // const user = useSelector((state) => state.user);
  const user = window.localStorage.getItem("loggedinUser");

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("I am in app useeffect");
    dispatch(getPatient());
  }, [dispatch]);

  const hanldeDelete = (id) => {
    dispatch(removePatient(id));
    dispatch(getPatient());
  };

  return (
    <>
      <Router>
        <Nav />
        <Notification severity={severity} msg={msg} />

        <Routes>
          <Route
            path="/"
            element={user ? <Home hanldeDelete={hanldeDelete} /> : <Login />}
          />
          <Route
            path="/add"
            element={<Add setSeverity={setSeverity} setMsg={setMsg} />}
          />
          <Route
            path="/edit/:id"
            element={<Edit setMsg={setMsg} setSeverity={setSeverity} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/patientList/:id"
            element={<PatientDetail hanldeDelete={hanldeDelete} />}
          />
          <Route
            path="*"
            element={<Login setMsg={setMsg} setSeverity={setSeverity} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
