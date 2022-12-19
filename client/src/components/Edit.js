import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import { updatePatient } from "../reducers/patientReducer";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Edit({ setSeverity, setMsg }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const patientList = useSelector((state) => state.patient);

  const selectedPatient = patientList.find((x) => x.id === id);

  const [newFullname, setFullname] = useState(selectedPatient.name);
  const [newEmail, setEmail] = useState(selectedPatient.email);
  const [newPhone, setPhone] = useState(selectedPatient.contact);
  const [newCity, setCity] = useState(selectedPatient.city);
  const [newProfile, setProfile] = useState(selectedPatient.profile_pic);
  const [newDob, setDob] = useState(selectedPatient.dob);
  const [newLastAppointment, setLastAppointment] = useState(
    selectedPatient.last_appointment
  );
  const [newNextAppointment, setNextAppointment] = useState(
    selectedPatient.next_appointment
  );
  const [newRegisterDate, setRegisterDate] = useState(
    selectedPatient.register_date
  );

  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedPatient = {
      name: newFullname,
      email: newEmail,
      contact: newPhone,
      city: newCity,
      profile_pic: newProfile,
      dob: newDob,
      last_appointment: newLastAppointment,
      next_appointment: newNextAppointment,
      register_date: newRegisterDate,
    };
    setSeverity("success");
    setMsg(`Successfully edited ${updatePatient.name}.`);
    setTimeout(() => {
      setMsg(null);
    }, 5000);
    navigate("/");
    dispatch(updatePatient(selectedPatient.id, updatedPatient)).catch(function (
      err
    ) {
      setSeverity("error");
      setMsg(err.response.data.error);
    });
  };

  const handleCancel = () => {
    navigate("/");
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
        <Typography variant="h4">Edit Patient Detail</Typography>
        <Box component="form" onSubmit={handleEdit} sx={{ mt: 1 }}>
          <Grid container item xs={12} gap={0.5}>
            <Grid item xs={11}>
              <TextField
                margin="normal"
                fullWidth
                label="Full name"
                value={newFullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </Grid>
            <Grid item xs={6.5}>
              <TextField
                margin="normal"
                fullWidth
                label="E-mail"
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
            <Grid item xs={11}>
              <TextField
                margin="normal"
                fullWidth
                label="Profile pic"
                value={newProfile}
                onChange={(e) => setProfile(e.target.value)}
              />
            </Grid>
            <Grid item xs={11}>
              <TextField
                margin="normal"
                fullWidth
                id="contact"
                label="Phone number"
                value={newPhone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={11}>
              <TextField
                margin="normal"
                fullWidth
                label="City "
                value={newCity}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={11}>
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

            <Grid container item sx={{ mt: 1 }} gap={2} xs={12}>
              <Grid item xs={6}>
                <Button
                  id="edit-button"
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Edit
                </Button>
              </Grid>
              <Grid item xs={4.6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  onClick={handleCancel}
                >
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
