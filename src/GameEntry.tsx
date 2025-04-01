import { Button, List, ListSubheader, Typography } from "@mui/material";
import { StatusJson } from "./Game";

type Props = {
  name: string;
  entryWord: string;
  statusJson: StatusJson;
};

const GameEntry: React.FC<Props> = (prop) => {
  return (
    <div>
      <Typography variant="h4" sx={{ margin: "40px" }}>
        ゲームエントリー
      </Typography>
      <Typography variant="h5">セッション名</Typography>
      <Typography variant="h6">{prop.name}</Typography>
      <List>
        <ListSubheader>参加者</ListSubheader>
        {prop.statusJson.InGameUserName.map((username, index) => (
          <Typography key={index} variant="h6">
            {username}
          </Typography>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          // Handle game start logic here
          console.log("ゲームを開始します");
        }}
        sx={{ margin: "20px" }}
        disabled={prop.statusJson.InGameUserName.length < 2}
      >
        ゲームを開始する
      </Button>
    </div>
  );
};

export default GameEntry;
