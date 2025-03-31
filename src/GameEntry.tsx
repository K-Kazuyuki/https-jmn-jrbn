import { List, ListSubheader, Typography } from "@mui/material";

type Props = {
  name: string;
  entryWord: string;
  usernames: string[];
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
        {prop.usernames.map((username, index) => (
          <Typography key={index} variant="h6">
            {username}
          </Typography>
        ))}
      </List>
    </div>
  );
};

export default GameEntry;
