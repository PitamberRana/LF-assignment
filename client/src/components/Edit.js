import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Edit() {
  const [value, setValue] = useState(null);
  const handleEdit = (id) => {
    console.log("edit", id);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Edit Patient Detail
        </Typography>
        <Box component="form" onSubmit={handleEdit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullname"
            label="Full name"
            name="fullname"
            autoComplete="fullname"
            autoFocus
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField sx={{ mt: 1 }} required fullWidth {...params} />
              )}
            />
          </LocalizationProvider>

          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone number"
            type="phone"
            id="phone"
            autoComplete="phone"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="city"
            label="City "
            type="city"
            id="city"
            autoComplete="city"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Last appointment"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField sx={{ mt: 1, mb: 1 }} fullWidth {...params} />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Next appointment"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField sx={{ mt: 1, mb: 1 }} fullWidth {...params} />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Next appointment"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField sx={{ mt: 1, mb: 1 }} fullWidth {...params} />
              )}
            />
          </LocalizationProvider>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
