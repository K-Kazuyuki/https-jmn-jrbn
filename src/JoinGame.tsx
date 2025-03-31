import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
const JoinGame: React.FC = () => {
  const [entryWord, setEntryWord] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const getSessionId = async () => {
    await axios
      .post("/api/getSessionId", { entryWord: entryWord })
      .then((res) => {
        if (res.data.length > 0) {
          const sessionId = res.data[0].SessionId;
          window.location.href = `/game?sessionId=${sessionId}`;
        } else {
          setErrorMessages("セッションが見つかりませんでした。");
        }
      })
      .catch((error) => {
        console.error("Error fetching session ID:", error);
        setErrorMessages("セッションが見つかりませんでした。");
      });
  };

  return (
    <>
      <Typography variant="h5">
        参加するセッションのキーワードを入力してください
      </Typography>
      <TextField
        label="例: 01234"
        variant="outlined"
        fullWidth
        style={{ margin: "20px" }}
        value={entryWord}
        onChange={(e) => setEntryWord(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={getSessionId}
      >
        参加する
      </Button>
      {errorMessages && (
        <Typography variant="body2" color="error" style={{ margin: "20px" }}>
          {errorMessages}
        </Typography>
      )}
    </>
  );
};
export default JoinGame;
