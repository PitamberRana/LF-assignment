import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PatientList({ query }) {
  const navigate = useNavigate();

  const patientList = useSelector((state) => state.patient);

  const handleEdit = (id) => {
    console.log("edit", id);
    navigate("/edit");
  };

  const handleDelete = (id) => {
    console.log("delete", id);
  };
  return (
    <div>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#95e6cc" }}>
              <TableCell>Special Care</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Phone number</TableCell>
              <TableCell align="left">City</TableCell>
              <TableCell align="left">Last Appointment</TableCell>
              <TableCell align="left">Next Appointment</TableCell>
              <TableCell align="left">Register date </TableCell>
              <TableCell align="left">Action </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientList
              ?.filter((list) => list.name.toLowerCase().includes(query))
              ?.map((data) => (
                <TableRow
                  key={data.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    star
                  </TableCell>
                  <TableCell align="left">{data.name}</TableCell>
                  <TableCell align="left">{data.phone}</TableCell>
                  <TableCell align="left">{data.city}</TableCell>
                  <TableCell align="left">{data.last_appointment}</TableCell>
                  <TableCell align="left">{data.next_appointment}</TableCell>
                  <TableCell align="left">{data.register_date}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(data.id)}>Edit</Button>
                    <Button color="error" onClick={() => handleDelete(data.id)}>
                      delete
                    </Button>{" "}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
