import { AppBar, Container, Link, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid2";
const Footer = () => {
  return (
    <>
      <Toolbar>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0, paddingY: 1 }}
        >
          <Container maxWidth="md">
            <Grid container spacing={2}>
              <Grid size={{ xs: 4 }}>
                <Link href="#" sx={{ color: "white" }}>
                  Home
                </Link>
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Link href="#" sx={{ color: "white" }}>
                  About
                </Link>
              </Grid>
              <Grid size={{ xs: 4 }}>
                <Link href="#" sx={{ color: "white" }}>
                  Contact
                </Link>
              </Grid>
            </Grid>
          </Container>
        </AppBar>
      </Toolbar>
    </>
  );
};

export default Footer;
