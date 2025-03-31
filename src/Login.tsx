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
  const [errorMessage, setErrorMessages] = useState<string>();

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
      localStorage.setItem("userId", userCredential.user.uid);

      window.location.href = "/";
    } catch (error) {
      console.error("Sign-up error:", error);
      setErrorMessages(getErrorMessage(error));
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
      localStorage.setItem("userId", userCredential.user.uid);
      window.location.href = "/";
    } catch (error) {
      console.error("Sign-in error:", error);
      setErrorMessages(getErrorMessage(error));
    }
  };
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      switch (error.message) {
        case "Firebase: Error (auth/email-already-in-use).":
          return "このメールアドレスはすでに使用されています。";
        case "Firebase: Error (auth/invalid-email).":
          return "無効なメールアドレスです。";
        case "Firebase: Error (auth/operation-not-allowed).":
          return "この操作は許可されていません。";
        case "Firebase: Error (auth/weak-password).":
          return "パスワードが弱すぎます。";
        case "Firebase: Error (auth/user-not-found).":
          return "ユーザーが見つかりません。";
        case "Firebase: Error (auth/invalid-credential).":
          return "E-mail かパスワードが間違っています．";
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          return "パスワードは6文字以上である必要があります。";
      }
      return error.message;
    }
    return "An unknown error occurred.";
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
        <Typography variant="subtitle1" color="red">
          {errorMessage}
        </Typography>
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
