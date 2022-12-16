import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Add({ addPatient, setSeverity, setMsg }) {
  const [newFullname, setFullname] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newPhone, setPhone] = useState("");
  const [newCity, setCity] = useState("");
  const [newProfile, setProfile] = useState("");
  const [newDob, setDob] = useState(null);
  const [newLastAppointment, setLastAppointment] = useState(null);
  const [newNextAppointment, setNextAppointment] = useState(null);
  const [newRegisterDate, setRegisterDate] = useState(null);

  const handleAdd = async (e) => {
    e.preventDefault();

    addPatient({
      name: newFullname,
      email: newEmail,
      contact: newPhone,
      city: newCity,
      profile_pic: newProfile,
      dob: newDob,
      last_appointment: newLastAppointment,
      next_appointment: newNextAppointment,
      register_date: newRegisterDate,
    });
    setSeverity("success");
    setMsg("Successfully added.");
    setTimeout(() => {
      setMsg(null);
    }, 5000);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Add new patient</Typography>
        <Box component="form" onSubmit={handleAdd} sx={{ mt: 1 }}>
          <Grid container item xs={12} gap={0.5}>
            <Grid item xs={11}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Full name"
                name="fullname"
                value={newFullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </Grid>
            <Grid item xs={6.5}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                value={newEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={4.4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={newDob}
                  onChange={(newValue) => {
                    setDob(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ mt: 2 }} required fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid container item xs={11}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="profile"
                label="Profile pic"
                name="profile"
                value={newProfile}
                onChange={(e) => setProfile(e.target.value)}
              />
            </Grid>
            <Grid container item xs={11}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone number"
                type="phone"
                id="phone"
                value={newPhone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid container item xs={11}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="city"
                label="City "
                type="city"
                id="city"
                value={newCity}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid container item xs={11}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Register date"
                  value={newRegisterDate}
                  onChange={(newValue) => {
                    setRegisterDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ mt: 1, mb: 1 }} fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={5.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Last appointment"
                  value={newLastAppointment}
                  onChange={(newValue) => {
                    setLastAppointment(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ mt: 1, mb: 1 }} fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={5.4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Next appointment"
                  value={newNextAppointment}
                  onChange={(newValue) => {
                    setNextAppointment(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ mt: 1, mb: 1 }} fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <FormControlLabel
              control={<Checkbox />}
              label="Is a special attention needed patient?"
            />
            <Grid container sx={{ mt: 1 }} gap={2} xs={12}>
              <Grid item xs={6}>
                <Button type="submit" fullWidth variant="contained">
                  Add
                </Button>
              </Grid>
              <Grid item xs={4.6}>
                <Button type="submit" fullWidth variant="outlined">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
