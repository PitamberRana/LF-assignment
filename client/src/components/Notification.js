import React from "react";
import Alert from "@mui/material/Alert";

export default function Notification({ msg, severity }) {
  if (msg === null) {
    return null;
  }

  return (
    <Alert severity={severity === "success" ? "success" : "error"}>{msg}</Alert>
  );
}
