import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from "react-router-dom";
import PortalRoutes from './routes/routes';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import LoginRoutes from './routes/loginRouter';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);


const theme = createTheme({
  palette: {
    primary: { main: '#FF7200' },
    secondary: { main: '#19857b' },
    error: { main: red.A400 },
    background: { default: "#fafafa" }
  }
})

function Greeting() {
//  const isLoggedIn = localStorage.getItem("token");
//  if (!isLoggedIn) {
//    return <LoginRoutes />;
//  }
  return <PortalRoutes />;
}

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Greeting />
    </Router>
  </ThemeProvider>,
);