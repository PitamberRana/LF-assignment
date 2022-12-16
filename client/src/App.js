import Home from "./components/Home";
import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Login from "./components/Login";
import Register from "./components/Register";
import PatientDetail from "./components/PatientDetail";
import { getPatient } from "./reducers/patientReducer";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./reducers/userReducer";
import Notification from "./components/Notification";
import patientService from "./services/patient";

function App() {
  const [msg, setMsg] = useState(null);
  const [severity, setSeverity] = useState("");

  const patientList = useSelector((state) => state.patient);

  // const user = useSelector((state) => state.user);
  const user = window.localStorage.getItem("loggedinUser");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatient());
  }, [dispatch]);

  const addPatient = (patientObj) => {
    patientService
      .create(patientObj)
      .then((returnedObj) => {
        const newlist = patientList.concat(returnedObj);
        console.log(newlist);
      })
      .catch(function (err) {
        setSeverity("error");
        setMsg(err.response.data.error);
      });
  };

  return (
    <>
      <Router>
        <Nav />
        <Notification severity={severity} msg={msg} />

        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Home />
              ) : (
                <Login setMsg={setMsg} setSeverity={setSeverity} />
              )
            }
          />
          <Route
            path="/add"
            element={
              <Add
                addPatient={addPatient}
                setSeverity={setSeverity}
                setMsg={setMsg}
              />
            }
          />
          <Route path="/edit" element={<Edit />} />
          <Route path="/id" element={<PatientDetail />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
