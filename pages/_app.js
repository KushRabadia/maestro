import Head from "next/head";
import { Fragment } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "../styles/global.css";

let theme = createTheme({
  palette: {
    primary: {
      main: '#8338EC',
    },
    secondary: {
      main: '#FF4081',
    },
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Maestro AI</title>
      </Head>
      <ThemeProvider theme={theme}><Component {...pageProps}/></ThemeProvider>
    </Fragment>
  );
}

export default MyApp;
