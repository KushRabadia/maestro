import { useCallback, useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { SessionProvider } from "next-auth/react";
import { wrapper } from '@/store/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { setUser } from '@/store/actions/userActions';
import { User } from '@/types';
import { getUserDetails } from '../lib/config';
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
  const expiryDate = typeof window !== 'undefined' ? localStorage.getItem('expiryDate') : null;
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  useEffect(() => {
    let user: User | null = null;

    const initializeApp = async () => {
      if (storedToken) {
        if (expiryDate) {
          const currentTimestamp = Date.now();
          const expiryTimestamp = new Date(expiryDate).getTime();
  
          if (expiryTimestamp > currentTimestamp) {
            localStorage.removeItem('token');
            localStorage.removeItem('expiryDate');
            return;
          }
        }

        try {
          const response = await fetch(getUserDetails, {
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
  }, [expiryDate, store, storedToken]);

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Head>
          <title>Maestro AI</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;

// export async function getServerSideProps({ req, res }) {
//   return {
//     props: {
//       session: await getServerSession(req, res, authOptions)
//     }
//   }
// }
