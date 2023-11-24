import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Input({ text }) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { width: 300 },
      }}
      autoComplete="off"
    >
      <TextField required id="outlined-basic" variant="outlined" label={text} />
    </Box>
  );
}
