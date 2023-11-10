import React, { useState } from "react";
import Router from "next/router";
import Layout from "@/layout/layout";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { loginUser } from "../lib/config";

interface SignInFormData {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formState, setFormState] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");

  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");

  const handleChange =
    (field: keyof SignInFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormState({
        ...formState,
        [field]: value,
      });

      if (field == "email") {
        if (value.trim() == "") {
          setEmailError(true);
          setEmailErrorMsg("email cannot be empty");
        } else {
          setEmailError(false);
          setEmailErrorMsg("");
        }
      }
      if (field == "password") {
        if (value.trim() == "") {
          setPasswordError(true);
          setPasswordErrorMsg("password cannot be empty");
        } else {
          setPasswordError(false);
          setPasswordErrorMsg("");
        }
      }
    };

  const checkFormValidity = (): boolean => {
    let validity = true;
    if (formState.email.trim() == "") {
      setEmailError(true);
      setEmailErrorMsg("Please enter email");
      validity = false;
    }
    if (formState.password.trim() == "") {
      setPasswordError(true);
      setPasswordErrorMsg("Please enter password");
      validity = false;
    }
    return validity;
  };

  const signinHandler = async () => {
    try {
      setLoading(true);
      if (emailError || passwordError || !checkFormValidity()) {
        return;
      }

      const bodyFormData = new FormData();
      bodyFormData.append("email", formState.email);
      bodyFormData.append("password", formState.password);

      const response = await fetch(loginUser, {
        method: "POST",
        body: bodyFormData,
      });

      if (!response.ok) {
        const resData = await response.json();
        if (response.status === 401 || response.status === 422) {
          console.log(resData.message);
          throw new Error("Validation failed.");
        } else {
          console.log("Error!");
          throw new Error("Validation failed!");
        }
      }

      const resData = await response.json();
      localStorage.setItem("token", resData.token);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      Router.push("/home");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <Container maxWidth="sm">
        <Box className={"register_boxLayout"}>
          <Link href="/login">
            <Button className={"register_pageButton"}>Login</Button>
          </Link>
          <Link href="/register">
            <Button className={"register_pageButton"} sx={{ opacity: 0.5 }}>
              Register
            </Button>
          </Link>
        </Box>

        <Container maxWidth="sm" className="register_containerLayout">
          <Stack gap={4}>
            <Typography variant="h6">Login</Typography>

            <TextField
              error={emailError}
              helperText={emailErrorMsg}
              id="standard-basic"
              label="Email Address"
              variant="outlined"
              required
              className="register_textField"
              type="email"
              onChange={handleChange("email")}
              value={formState.email}
            />
            <TextField
              error={passwordError}
              helperText={passwordErrorMsg}
              id="standard-basic"
              label="Password"
              variant="outlined"
              required
              className="register_textField"
              type="password"
              onChange={handleChange("password")}
              value={formState.password}
            />

            <Button
              variant="contained"
              className="register_dataButton"
              type="submit"
              onClick={signinHandler}
            >
              Login
            </Button>
          </Stack>
        </Container>
      </Container>
    </Layout>
  );
};

export default Register;
