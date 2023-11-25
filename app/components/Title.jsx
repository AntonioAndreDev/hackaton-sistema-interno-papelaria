import { Typography } from "@mui/material";

export default function Title({ text }) {
  return (
    <Typography variant="h5" className="mt-6 mb-4 font-semibold text-xl">
      {text}
    </Typography>
  );
}
