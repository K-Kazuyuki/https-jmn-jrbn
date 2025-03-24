import { Button, Slider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

type Props = {
  userName: string;
};

const StartGamePage: React.FC<Props> = ({ userName }) => {
  const [gameName, setGameName] = useState("");
  const [playerName, setPlayerName] = useState(userName);
  const [userLimit, setUserLimit] = useState(4);
  const [timeLimit, setTimeLimit] = useState(4);
  const [errorMessages, setErrorMessages] = useState(Array<string>());

  const validate = (): boolean => {
    const tmpErrorMessages = [];
    if (gameName === "") {
      tmpErrorMessages.push("セッション名を入力してください");
    }
    if (playerName === "") {
      tmpErrorMessages.push("プレイヤー名を入力してください");
    }
    if (tmpErrorMessages.length > 0) {
      setErrorMessages(tmpErrorMessages);
      return false;
    }
    setErrorMessages([]);
    return true;
  };

  React.useEffect(() => {
    // 必要に応じて初期化処理をここに記述
    setPlayerName(userName);
  }, [userName]);

  return (
    <>
      <div>
        <Typography variant="h4" sx={{ margin: "40px" }}>
          ゲームを始める
        </Typography>
        <Typography variant="h5">セッション名</Typography>
        <TextField
          label="例: 最高裁交流回"
          variant="outlined"
          fullWidth
          style={{ margin: "20px" }}
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />

        <Typography variant="h5">プレイヤー名</Typography>
        <TextField
          label="例: 柑橘 旨美"
          variant="outlined"
          fullWidth
          style={{ margin: "20px" }}
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <Typography variant="h5">参加者上限</Typography>
        <Slider
          defaultValue={4}
          step={1}
          marks
          min={2}
          max={10}
          valueLabelDisplay="on"
          style={{ margin: "20px" }}
          value={userLimit}
          onChange={(_, value) => setUserLimit(value as number)}
        />
        <Typography variant="h5">制限時間 (分)</Typography>
        <Slider
          defaultValue={4}
          step={1}
          marks
          min={2}
          max={10}
          valueLabelDisplay="on"
          style={{ margin: "20px" }}
          value={timeLimit}
          onChange={(_, value) => setTimeLimit(value as number)}
        />
      </div>
      <div>
        {errorMessages.map((message, index) => (
          <Typography key={index} variant="subtitle1" color="red">
            {message}
          </Typography>
        ))}
      </div>
      <div>
        <br />
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "20px" }}
          onClick={() => {
            if (validate()) {
              fetch("/api/createGameSession", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  gameName,
                  playerName,
                  userLimit,
                  timeLimit,
                }),
              })
                .then(async (response) => {
                  if (!response.ok) {
                    const errorDetails = await response.json();
                    throw new Error(
                      errorDetails.message || response.statusText
                    );
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Game started successfully:", data[0]);
                  // ゲーム画面に遷移
                  window.location.href = `/game-entry?sessionId=${encodeURIComponent(
                    data[0].SessionId
                  )}`; // URLエンコードを追加して安全性を向上
                })
                .catch((error) => {
                  console.error("Error starting the game:", error);
                  // エラーメッセージを表示
                  alert(
                    `ゲームの開始に失敗しました: ${
                      error.message || "詳細はコンソールを確認してください。"
                    }`
                  );
                });
            }
          }}
        >
          ゲームを始める
        </Button>
      </div>
    </>
  );
};

export default StartGamePage;
