import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";

export default function Edit() {
  // const handleEdit = (id) => {
  //   console.log("edit", id);
  // };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Edit Patient Details</h1>
          <InputLabel>Full name</InputLabel>
          <TextField id="fullname" type="text" name="fullname" fullWidth />
          <InputLabel>Phone number</InputLabel>

          <TextField id="phone" type="phone" name="phone" fullWidth />
          <InputLabel>City</InputLabel>

          <TextField id="city" type="city" name="city" fullWidth />
          <InputLabel>Last appointment</InputLabel>

          <TextField
            id="lastappointment"
            type="date"
            name="lastappointment"
            fullWidth
          />
          <InputLabel>Next appointment</InputLabel>
          <TextField
            id="nextappointment"
            type="date"
            name="nextappointment"
            fullWidth
          />
          <InputLabel>Register Date</InputLabel>
          <TextField
            id="registerdate"
            type="date"
            name="registerdate"
            fullWidth
          />
          <Button variant="contained"> Edit </Button>
        </Box>
      </Container>
    </div>
  );
}
