import { useEffect } from "react";
import Head from "next/head";
import { AppProps } from 'next/app';
import { Provider, useDispatch } from 'react-redux';
import { wrapper } from "@/store/store";
import store from '@/store/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { setUser } from '@/store/actions/userActions';
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

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  useEffect(() => {
    const initializeApp = async () => {
      const token = localStorage.getItem('token');
      const expiryDate = localStorage.getItem('expiryDate');

      if (token && expiryDate) {
        try {
          const currentTimestamp = new Date().getTime();
          const expiryTimestamp = new Date(expiryDate).getTime();

          // Check if the token is about to expire (e.g., within the next 5 minutes)
          if (expiryTimestamp - currentTimestamp < 5 * 60 * 1000) {
            // Make a request to your backend to fetch user details using the token
            const response = await fetch('http://localhost:8000/api/user/details', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
  
            if (response) {
              const responseData = await response.json();
              store.dispatch(setUser(responseData.user));
              const remainingMilliseconds = 60 * 60 * 1000;
              const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
              localStorage.setItem('token', responseData.token);
              localStorage.setItem('expiryDate', expiryDate.toISOString());
            } else {
              // Handle non-successful response
              console.error('Error fetching user details');
            }
          }
        } catch (error) {
          // Handle network or other errors
          console.error('Error fetching user details:', error);
        }
      }
    };

    // Call the initialization function
    initializeApp();
  }, []);

  return (
    <Provider store={store}>
      <Head><title>Maestro AI</title></Head>
      <ThemeProvider theme={theme}><Component {...pageProps}/></ThemeProvider>
    </Provider>
  );
}

export default MyApp;