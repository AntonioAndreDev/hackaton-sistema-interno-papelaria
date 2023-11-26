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
import { Toaster, toast } from "sonner";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const validacao = {
    validateName(name) {
      return name.length >= 3;
    },
    validateLastName(lastName) {
      return lastName.length >= 3;
    },
    validatePassword(password) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
      return regex.test(password);
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nome = data.get("name");
    const sobrenome = data.get("sobrenome");
    const senha = data.get("password");

    if (!validacao.validateName(nome)) {
      toast.warning("Nome inválido");
      return;
    }

    if (!validacao.validateLastName(sobrenome)) {
      toast.warning("Sobrenome inválido");
      return;
    }

    if (!validacao.validatePassword(senha)) {
      toast.warning("Senha fraca");
      return;
    }

    console.log({ nome, sobrenome, senha });
    const email = `${nome.toLowerCase()}.${sobrenome.toLowerCase()}@papersaad.gov.br`;
    const newAccount = {
      nome,
      sobrenome,
      senha,
      email,
    };

    const accounts = JSON.parse(localStorage.getItem("contas")) || [];
    accounts.push(newAccount);
    localStorage.setItem("contas", JSON.stringify(accounts));
    toast.success("Conta criada com sucesso!");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
          <Typography component="h1" variant="h5">
            Criar conta
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="sobrenome"
                  label="Sobrenome"
                  name="sobrenome"
                  autoComplete="family-name"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              className="bg-blue-500 font-semibold"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Criar conta
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={"/"} className="text-blue-400 text-sm border-b border-blue-400">
                  {"Já possui uma conta? Entre agora"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Toaster position="top-center" />{" "}
    </ThemeProvider>
  );
}
