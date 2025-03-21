import { Button, Slider, TextField, Typography } from "@mui/material";

const StartGamePage = () => {
  return (
    <div>
      <Typography variant="h4" sx={{ margin: "40px" }}>
        ゲームを始める
      </Typography>
      <Typography variant="h5">この回の名前</Typography>
      <TextField
        label="例: 最高裁交流回"
        variant="outlined"
        fullWidth
        style={{ margin: "20px" }}
      />
      <Typography variant="h5">参加者上限</Typography>
      <Slider
        defaultValue={4}
        step={1}
        marks
        min={2}
        max={10}
        valueLabelDisplay="auto"
        style={{ margin: "20px" }}
      />
      <Button variant="contained" color="primary" style={{ margin: "20px" }}>
        ゲームを始める
      </Button>
    </div>
  );
};

export default StartGamePage;
