import { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@/store/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { setUser } from '@/store/actions/userActions';
import { User } from '@/types';
import '../styles/global.css';

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
  const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  useEffect(() => {
    let user: User | null = null;

    const initializeApp = async () => {
      if (storedToken) {
        try {
          const response = await fetch('http://localhost:8000/api/user/details', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (response) {
            const responseData = await response.json();
            user = responseData.user;
            store.dispatch(setUser(user));
            const remainingMilliseconds = 60 * 60 * 1000;
            const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('expiryDate', expiryDate.toISOString());
          } else {
            // Handle non-successful response
            console.error('Error fetching user details');
          }
        } catch (error) {
          // Handle network or other errors
          console.error('Error fetching user details:', error);
        }
      }
    };

    initializeApp();
  }, [store, storedToken]);

  return (
    <Provider store={store}>
      <Head>
        <title>Maestro AI</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
