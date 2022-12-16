import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";

export default function Nav() {
  const navigate = useNavigate();

  // const user = useSelector((state) => state.user);
  const user = JSON.parse(window.localStorage.getItem("loggedinUser"));

  const navigateToLogin = () => {
    navigate("/register");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ color: "#FFF", textDecoration: "none" }}>
              Patient Profile Management
            </Link>
          </Typography>
          {!user ? (
            <Button color="inherit" onClick={navigateToLogin}>
              Register
            </Button>
          ) : (
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar />
              {user.email}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
