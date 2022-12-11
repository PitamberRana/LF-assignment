import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";

export default function Add() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [lastAppointment, setLastAppointment] = useState("");
  const [nextAppointment, setNextAppointment] = useState("");
  const [registerDate, setRegisterDate] = useState("");

  const handleAdd = () => {
    console.log("add");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleAdd}>
          <h1>Add New Patient</h1>
          <InputLabel>Full name</InputLabel>
          <TextField
            id="fullname"
            type="text"
            name="fullname"
            value={fullname}
            fullWidth
            onChange={(e) => setFullname(e.target.value)}
          />
          <InputLabel>Phone number</InputLabel>

          <TextField
            id="phone"
            type="phone"
            name="phone"
            value={phone}
            fullWidth
            onChange={(e) => setPhone(e.target.value)}
          />
          <InputLabel>City</InputLabel>

          <TextField
            id="city"
            type="city"
            name="city"
            value={city}
            fullWidth
            onChange={(e) => setCity(e.target.value)}
          />
          <InputLabel>Last appointment</InputLabel>

          <TextField
            id="lastappointment"
            type="date"
            name="lastappointment"
            value={lastAppointment}
            fullWidth
            onChange={(e) => setLastAppointment(e.target.value)}
          />
          <InputLabel>Next appointment</InputLabel>
          <TextField
            id="nextappointment"
            type="date"
            name="nextappointment"
            value={nextAppointment}
            fullWidth
            onChange={(e) => setNextAppointment(e.target.value)}
          />
          <InputLabel>Register Date</InputLabel>
          <TextField
            id="registerdate"
            type="date"
            name="registerdate"
            value={registerDate}
            fullWidth
            onChange={(e) => setRegisterDate(e.target.value)}
          />
          <div style={{ marginTop: "30px" }}>
            <input type="submit" value="Add" />
            <input
              style={{ marginLeft: "12px" }}
              className="muted-button"
              type="button"
              value="Cancel"
            />
          </div>
        </form>
      </Box>
    </Container>
  );
}
