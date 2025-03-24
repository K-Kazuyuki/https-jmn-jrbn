import React, { useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Button,
  TextField,
  ToggleButton,
  Typography,
  Box,
} from "@mui/material";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", userCredential.user);

      fetch("/api/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userCredential.user.uid, name }),
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.message || response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          console.log("User registered successfully:", data);
        });

      window.location.href = "/";
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in:", userCredential.user);
      window.location.href = "/";
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {isRegister ? "新規登録" : "ログイン"}
      </Typography>
      <form onSubmit={isRegister ? handleSignUp : handleSignIn}>
        {isRegister && (
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: 2 }}
        >
          {isRegister ? "Register" : "Sign In"}
        </Button>
      </form>
      <ToggleButton
        value="check"
        selected={isRegister}
        onChange={() => setIsRegister(!isRegister)}
        sx={{ marginTop: 2 }}
      >
        {isRegister ? "ログインに切り替え" : "新規登録"}
      </ToggleButton>
    </Box>
  );
};

export default Login;
