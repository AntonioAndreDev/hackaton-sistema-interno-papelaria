import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function InputNumber({ text, onChange, value, required = true }) {
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
        required={required}
        id="outlined-basic"
        variant="outlined"
        type="number"
        label={text}
      />
    </Box>
  );
}
