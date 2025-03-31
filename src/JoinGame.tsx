import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
const JoinGame: React.FC = () => {
  const [entryWord, setEntryWord] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const getSessionId = async () => {
    await axios
      .post("/api/getSessionId", { entryWord: entryWord })
      .then((res) => {
        if (res.data.length > 0) {
          setSessionId(res.data[0].SessionId);
        } else {
          setErrorMessages("セッションが見つかりませんでした。");
        }
      })
      .catch((error) => {
        console.error("Error fetching session ID:", error);
        setErrorMessages("セッションが見つかりませんでした。");
      });
  };

  const JoinGame = async () => {
    const userId = localStorage.getItem("userId") || "";
    await axios
      .post("/api/joinUser", {
        sessionId: sessionId,
        playerName: playerName,
        userId: userId,
      })
      .then((res) => {
        if (res.data.length > 0) {
          console.log("参加成功", res.data);
          window.location.href = `/game?sessionId=${sessionId}`;
        } else {
          setErrorMessages("参加に失敗しました。");
        }
      })
      .catch((error) => {
        console.error("Error joining game:", error);
        setErrorMessages("参加に失敗しました。" + error.message);
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
      {sessionId === "" && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={getSessionId}
        >
          参加する
        </Button>
      )}
      {sessionId && (
        <>
          <Typography variant="h5">プレイヤー名</Typography>
          <TextField
            label="例: 柑橘 旨美"
            variant="outlined"
            fullWidth
            style={{ margin: "20px" }}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={JoinGame}
          >
            参加する
          </Button>
        </>
      )}
      {errorMessages && (
        <Typography variant="body2" color="error" style={{ margin: "20px" }}>
          {errorMessages}
        </Typography>
      )}
    </>
  );
};
export default JoinGame;
