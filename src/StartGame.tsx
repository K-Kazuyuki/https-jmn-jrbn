import { Button, Slider, TextField, Typography } from "@mui/material";
import { useState } from "react";

const StartGamePage = () => {
  const [sessionName, setSessionName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerLimit, setPlayerLimit] = useState(4);
  const [timeLimit, setTimeLimit] = useState(4);
  const [errorMessages, setErrorMessages] = useState(Array<string>());

  const validate = (): boolean => {
    const tmpErrorMessages = [];
    if (sessionName === "") {
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
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
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
          value={playerLimit}
          onChange={(_, value) => setPlayerLimit(value as number)}
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
            console.log(`セッション名: ${sessionName}`);
            console.log(`プレイヤー名: ${playerName}`);
            console.log(`参加者上限: ${playerLimit}`);
            console.log(`制限時間: ${timeLimit}`);
            if (validate()) {
              // ゲーム画面に遷移
              window.location.href = "/game";
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
