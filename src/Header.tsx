import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { auth } from "./firebase";

type Props = {
  name: string;
};

const Header: React.FC<Props> = ({ name }) => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
    }
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ top: 0 }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "left" }}>
          小説しりとり
        </Typography>
        <div
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            {name}
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            ログアウト
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
