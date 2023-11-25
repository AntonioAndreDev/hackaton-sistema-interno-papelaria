import { Typography } from "@mui/material";

export default function Title({ text }) {
  return (
    <Typography variant="h1" className="mt-6 mb-2 font-semibold text-xl">
      {text}
    </Typography>
  );
}
