import AppBar from "@mui/material/AppBar";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { Container } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export function MainView({ children }: { children?: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="sticky" elevation={2} color={"default"} enableColorOnDark sx={{ zIndex: 99 }}>
        <Toolbar>
          <YouTubeIcon color={"primary"} fontSize={"large"} sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Youtube MP3 Converter
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <main style={{ flexGrow: 1 }}>{children}</main> */}
      <Container component="main" style={{ flexGrow: 1 }}>
        {children}
      </Container>

      <Box sx={{ bgcolor: "background.paper", p: 3 }} component="footer">
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Developed By Lazix95
        </Typography>
        <Copyright />
      </Box>
    </div>
  );
}
