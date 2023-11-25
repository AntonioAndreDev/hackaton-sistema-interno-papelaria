import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function InputText({ text, autoFocus = false, onChange, value }) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { width: 300 },
      }}
      autoComplete="off"
    >
      <TextField
        onChange={onChange}
        value={value}
        required
        id="outlined-basic"
        variant="outlined"
        type="text"
        label={text}
        autoFocus={autoFocus}
      />
    </Box>
  );
}
