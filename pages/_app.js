import Head from "next/head";
import { Fragment } from "react";
import { Provider } from 'react-redux';
import store from '@/store/store';
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
    <Provider store={store}>
      <Head><title>Maestro AI</title></Head>
      <ThemeProvider theme={theme}><Component {...pageProps}/></ThemeProvider>
    </Provider>
  );
}

export default MyApp;
