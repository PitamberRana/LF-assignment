import React, { useState } from "react";
import {
  Button,
  Container,
  Paper,
  Avatar,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

export default function PatientDetail() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Button variant="contained"> Back</Button>
      <Paper sx={{ mt: 3, p: 4 }}>
        <Grid container align="center">
          <Grid item xs={4}>
            <Avatar
              alt="profile"
              src="https://res.cloudinary.com/drgujw4gf/image/upload/v1670998605/patientImg/jzm1em2ulnm6jjujbbzs.jpg"
              sx={{ width: 150, height: 150 }}
            />
            <Typography variant="h4"> Ram prasad</Typography>
            <Typography variant="subtitle2"> Ramprasad@gmail.com</Typography>
          </Grid>
          <Grid item xs={7}>
            <Grid container align="center" sx={{ mb: 2 }}>
              <Grid item xs>
                <Typography variant="subtitle2">Gender</Typography>
                <Typography variant="overline">female</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle2">Birthday</Typography>
                <Typography variant="overline">Dec 20, 1999</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle2">Phone number</Typography>
                <Typography variant="overline">9827536171</Typography>
              </Grid>
            </Grid>

            <Grid container align="center" sx={{ mb: 5 }}>
              <Grid item xs>
                <Typography variant="subtitle2">Street Address</Typography>
                <Typography variant="overline"> dont know tole</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle2">City</Typography>
                <Typography variant="overline">pokhara</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle2">Register date</Typography>
                <Typography variant="overline">Apr 21, 2022</Typography>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end" gap={3}>
              <Button variant="contained" color="secondary">
                Edit
              </Button>
              <Button variant="contained" color="error">
                Delete
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="">
            <Tab label="Next Appointment" value="1" />
            <Tab label="Last Appointment" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"> Date last </TabPanel>
        <TabPanel value="2"> Date next</TabPanel>
      </TabContext>
    </Container>
  );
}
