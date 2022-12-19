import React, { useEffect, useState } from "react";
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

  const patientListState = useSelector((state) => state.patient);
  const patientList = patientListState ? patientListState : null;

  const selectedPatient = patientList?.find((x) => x.id === id);

  const [newFullname, setFullname] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newPhone, setPhone] = useState("");
  const [newCity, setCity] = useState("");
  const [newProfile, setProfile] = useState("");
  const [newDob, setDob] = useState("");
  const [newLastAppointment, setLastAppointment] = useState("");
  const [newNextAppointment, setNextAppointment] = useState("");
  const [newRegisterDate, setRegisterDate] = useState("");

  useEffect(() => {
    setFullname(selectedPatient?.name);
    setEmail(selectedPatient?.email);
    setPhone(selectedPatient?.contact);
    setCity(selectedPatient?.city);
    setProfile(selectedPatient?.profile_pic);
    setDob(selectedPatient?.dob);
    setLastAppointment(selectedPatient?.last_appointment);
    setNextAppointment(selectedPatient?.next_appointment);
    setRegisterDate(selectedPatient?.register_date);
  }, [selectedPatient]);

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

  const uploadImage = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setProfile(Reader.result);
      }
    };
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
              <img
                src={selectedPatient?.profile_pic}
                alt={selectedPatient?.name}
                height={100}
                weight={120}
              />
              <TextField
                id="profile"
                name="profile"
                margin="normal"
                fullWidth
                type="file"
                accept="image/*"
                onChange={uploadImage}
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
