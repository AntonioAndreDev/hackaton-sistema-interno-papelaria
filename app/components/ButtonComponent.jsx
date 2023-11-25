import Button from "@mui/material/Button";

export default function ButtonComponent({ text, onClick }) {
  return (
    <Button
      onClick={onClick}
      className="bg-blue-500 font-semibold"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      {text}
    </Button>
  );
}
