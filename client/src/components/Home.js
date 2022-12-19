import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import PatientList from "./PatientList";
import { useNavigate } from "react-router-dom";

export default function Home({ hanldeDelete }) {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/add");
  };

  return (
    <div>
      <Grid container>
        <Grid item xs>
          <Box display="flex" justifyContent="flex-end" gap={3}>
            <TextField
              onChange={(e) => setQuery(e.target.value)}
              size="small"
              placeholder="Search patient..."
              sx={{ mt: 3, width: 300 }}
            />
            <Button
              id="new-entry-button"
              variant="contained"
              sx={{ mt: 3, mr: 3, width: 250 }}
              onClick={handleAdd}
            >
              Add new entry
            </Button>
          </Box>
        </Grid>
      </Grid>

      <PatientList hanldeDelete={hanldeDelete} query={query} />
    </div>
  );
}
