import React from "react";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function PatientList({ hanldeDelete, query }) {
  const navigate = useNavigate();

  const allPatients = useSelector((state) => state.patient);

  let patientList = allPatients
    ?.slice()
    ?.sort((a, b) => a.name.localeCompare(b.name))
    ?.sort((a, b) => b.special_attention - a.special_attention);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                background: "#2ecc71",
                "&:last-child td, &:last-child th": { border: 1 },
              }}
            >
              <TableCell align="center">Profile</TableCell>
              <TableCell align="center"> Name</TableCell>
              <TableCell align="center">Phone number</TableCell>
              <TableCell align="center">City</TableCell>
              <TableCell align="center">Last Appointment</TableCell>
              <TableCell align="center">Next Appointment</TableCell>
              <TableCell align="center">Register date </TableCell>
              <TableCell align="center">Action </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientList
              ?.filter((list) => list.name.toLowerCase().includes(query))
              ?.map((data) => (
                <TableRow
                  key={data.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    textDecoration: "none",
                  }}
                  component={Link}
                  to={{ pathname: `/patientList/${data.id}` }}
                >
                  <TableCell align="left">
                    {/* <Link to={`/patientList/${data.id}`}> */}
                    <img
                      src={data.profile_pic}
                      alt={data.name}
                      height={50}
                      width={50}
                    />
                    {/* </Link> */}
                  </TableCell>
                  <TableCell align="left">
                    <Box display="flex" alignItems="center" gap={2}>
                      <Icon
                        icon="material-symbols:medical-services-rounded"
                        width="24"
                        height="24"
                        color={data.special_attention ? "#FFC000" : "grey"}
                      />
                      {data.name}
                    </Box>
                  </TableCell>
                  <TableCell align="left">{data.contact}</TableCell>
                  <TableCell align="left">{data.city}</TableCell>
                  <TableCell align="left">{data.last_appointment}</TableCell>
                  <TableCell align="left">{data.next_appointment}</TableCell>
                  <TableCell align="left">{data.register_date}</TableCell>
                  <TableCell>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleEdit(data.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        hanldeDelete(data.id);
                      }}
                    >
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
