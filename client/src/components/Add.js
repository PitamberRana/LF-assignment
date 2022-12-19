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
import { useDispatch } from "react-redux";
import { addNewPatient } from "../reducers/patientReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Add({ setSeverity, setMsg }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState("");
  const [newDob, setDob] = useState(null);
  const [newLastAppointment, setLastAppointment] = useState(null);
  const [newNextAppointment, setNextAppointment] = useState(null);
  const [newRegisterDate, setRegisterDate] = useState(null);
  const [specialCare, setSpecialCare] = useState(true);

  const handleAdd = async (e) => {
    e.preventDefault();

    const newPatient = {
      name: e.target.name.value,
      email: e.target.email.value,
      contact: e.target.contact.value,
      city: e.target.city.value,
      profile_pic: profile,
      dob: newDob,
      last_appointment: newLastAppointment,
      next_appointment: newNextAppointment,
      register_date: newRegisterDate,
      special_attention: specialCare,
    };
    setSeverity("success");
    setMsg(`Successfully added ${newPatient.name} .`);
    setTimeout(() => {
      setMsg(null);
    }, 5000);
    navigate("/");
    dispatch(addNewPatient(newPatient)).catch(function (err) {
      setSeverity("error");
      setMsg(err.response.data.error);
    });
  };

  const handleCheck = () => {
    setSpecialCare(!specialCare);
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
    // };
    // const formData = new FormData();
    // console.log(formData);
    // formData.append("file", files[0]);
    // formData.append("upload_preset", "flzya9vx");
    // axios
    //   .post("https://api.cloudinary.com/v1_1/drgujw4gf/image/upload", formData)
    //   .then((res) => console.log(res));
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
                name="name"
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
                    <TextField
                      id="dob"
                      sx={{ mt: 2 }}
                      required
                      fullWidth
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={11}>
              <TextField
                type="file"
                margin="normal"
                required
                fullWidth
                id="profile"
                // label="Profile pic"
                name="profile"
                accept="image/*"
                onChange={uploadImage}
              />
            </Grid>
            <Grid item xs={11}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="contact"
                label="Phone number"
                id="contact"
              />
            </Grid>
            <Grid item xs={11}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="city"
                label="City "
                type="city"
                id="city"
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
                    <TextField
                      id="register-date"
                      sx={{ mt: 1, mb: 1 }}
                      fullWidth
                      {...params}
                    />
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
                    <TextField
                      id="last-appointment"
                      sx={{ mt: 1, mb: 1 }}
                      fullWidth
                      {...params}
                    />
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
                    <TextField
                      id="next-appointment"
                      sx={{ mt: 1, mb: 1 }}
                      fullWidth
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <FormControlLabel
              control={<Checkbox defaultChecked onChange={handleCheck} />}
              label="Is a special attention needed patient?"
              id="checkbox"
            />
            <Grid container item sx={{ mt: 1 }} gap={2} xs={12}>
              <Grid item xs={6}>
                <Button
                  id="add-button"
                  type="submit"
                  fullWidth
                  variant="contained"
                >
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
