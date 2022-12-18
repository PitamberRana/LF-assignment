import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Paper, Avatar, Typography, Grid, Box } from "@mui/material";
import { Button } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { Icon } from "@iconify/react";

export default function PatientDetail() {
  const { id } = useParams();

  const patientList = useSelector((state) => state.patient);
  const patient = patientList?.find((x) => x.id === id);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Button variant="contained" color="primary">
        {" "}
        Back
      </Button>
      <Paper sx={{ mt: 3, p: 4, mb: 2 }}>
        <Grid container align="center">
          <Grid item xs={4}>
            <Avatar
              alt="profile"
              src="https://res.cloudinary.com/drgujw4gf/image/upload/v1670998605/patientImg/jzm1em2ulnm6jjujbbzs.jpg"
              sx={{ width: 120, height: 120 }}
            />
            <Typography variant="h4"> {patient.name}</Typography>
            <Typography variant="subtitle2"> {patient.email} </Typography>
          </Grid>
          <Grid item xs={7}>
            <Grid container align="center" sx={{ mb: 2 }}>
              <Grid item xs>
                <Typography variant="subtitle2">Gender</Typography>
                <Typography variant="overline">{patient.gender}</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle2">Birthday</Typography>
                <Typography variant="overline">{patient.dob}</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle2">Phone number</Typography>
                <Typography variant="overline">{patient.contact}</Typography>
              </Grid>
            </Grid>

            <Grid container align="center" sx={{ mb: 5 }}>
              <Grid item xs>
                <Typography variant="subtitle2">Special Attention</Typography>
                <Typography variant="overline">
                  {" "}
                  {patient.special_attention}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle2">City</Typography>
                <Typography variant="overline">{patient.city}</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle2">Register date</Typography>
                <Typography variant="overline">
                  {patient.register_date}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab
              label="Next Appointment"
              value="1"
              icon={<Icon icon="mdi:page-next" height={24} />}
            />

            <Tab
              label="Last Appointment"
              value="2"
              icon={<Icon icon="mdi:page-previous" height={24} />}
            />
          </TabList>
        </Box>
        <TabPanel value="1"> {patient.last_appointment} </TabPanel>
        <TabPanel value="2"> {patient.next_appointment}</TabPanel>
      </TabContext>
    </Container>
  );
}
