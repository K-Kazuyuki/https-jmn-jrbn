import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 0 }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          あれ本
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
