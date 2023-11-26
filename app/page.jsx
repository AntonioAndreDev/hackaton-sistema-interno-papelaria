"use client";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

const defaultTheme = createTheme();

export default function SignIn() {
  const [todasContas, setTodasContas] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const contas = JSON.parse(localStorage.getItem("contas")) || [];
      setTodasContas(contas);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const emailDigitado = data.get("email");
    const senhaDigitada = data.get("password");

    const contaExiste = todasContas.find((conta) => conta.email === emailDigitado);

    if (contaExiste && contaExiste.email === emailDigitado && contaExiste.senha === senhaDigitada) {
      if (typeof window !== "undefined") {
        localStorage.setItem("username", contaExiste.nome);
      }

      window.location.href = "/dashboard";
    } else {
      toast.warning("Credenciais inválidas!");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container className="h-screen flex justify-center" component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar className="bg-blue-800">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className="text-center">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              className="bg-blue-500 font-semibold"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" className="text-blue-400 text-sm border-b border-blue-400">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href={"/sign-up"} className="text-blue-400 text-sm border-b border-blue-400">
                  {"Não tem um conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}
