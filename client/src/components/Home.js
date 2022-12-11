import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PatientList from "./PatientList";
import { useNavigate } from "react-router-dom";

export default function Home({ patientList }) {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/add");
  };

  return (
    <div>
      <TextField
        onChange={(e) => setQuery(e.target.value)}
        size="small"
        placeholder="Search patient..."
        sx={{ mt: 3 }}
      />
      <Button variant="contained" sx={{ mt: 3 }} onClick={handleAdd}>
        Add new entry
      </Button>
      <PatientList patientList={patientList} query={query} />
    </div>
  );
}
