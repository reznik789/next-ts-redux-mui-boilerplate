import React, { ForwardedRef, forwardRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import { useLoginMutation } from "api/auth";
import NotAuthorizeOnlyLayout from "layouts/NotAuthorizeOnlyLayout";

const formSx = {
  maxWidth: 500,
  px: 5,
  py: 6,
  display: "flex",
  flexDirection: "column",
  borderRadius: "0",
  animation: "form 2s cubic-bezier(.16,.7,.14,1) .6s both",
};
const LoginForm: React.FC = forwardRef(
  (props, ref: ForwardedRef<HTMLDivElement | null>) => {
    const [fetchLogin, { isLoading }] = useLoginMutation();
    console.log(isLoading);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => fetchLogin({ username: login, password });
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) =>
      setLogin(event.target.value);
    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(event.target.value);
    const clearInputs = () => {
      setLogin("");
      setPassword("");
    };
    return (
      <Card component={"form"} sx={formSx} ref={ref}>
        <Typography sx={{ fontSize: { xs: 32, md: 60 }, fontWeight: 300 }}>
          Авторизация
        </Typography>
        <Typography variant={"subtitle1"}>
          Для входа в систему введите логин и пароль
        </Typography>
        <TextField
          sx={{ my: 3 }}
          value={login}
          onChange={changeLogin}
          label="Логин"
          variant="filled"
        />
        <FormControl variant="filled">
          <InputLabel htmlFor="component-filled">Пароль</InputLabel>
          <FilledInput
            value={password}
            onChange={changePassword}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>{" "}
        <Box
          sx={{ mt: 3 }}
          display={"flex"}
          justifyContent={"flex-end"}
          gap={2}
        >
          <Button variant="text" onClick={clearInputs}>
            Очистить
          </Button>
          <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            variant="contained"
            onClick={handleLogin}
          >
            Войти
          </LoadingButton>
        </Box>
      </Card>
    );
  }
);
const containerSx = {
  p: 2,
  height: "100vh",
  width: "100%",
  backgroundImage:
    "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
  cursor: "default",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
};
const titleSx = {
  fontWeight: 500,
  fontSize: "72px",
  lineHeight: "96px",
  letterSpacing: "-1.5px",
  color: "#fff",
  display: { xs: "none", lg: "inherit" },
};

export default function Login() {
  return (
    <Box sx={containerSx}>
      <Slide direction={"right"} in timeout={1500}>
        <Typography sx={titleSx} variant={"h1"}>
          Добро пожаловать!
        </Typography>
      </Slide>
      <Slide direction={"up"} in timeout={1500}>
        <LoginForm />
      </Slide>
    </Box>
  );
}

Login.getLayout = function getLayout(page) {
  return <NotAuthorizeOnlyLayout>{page}</NotAuthorizeOnlyLayout>;
};
