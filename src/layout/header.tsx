import Alert from '@/components/alert';
import SearchBar from '@/components/search';
import { setUser } from '@/store/actions/userActions';
import { useAuthToken } from '@/utils/auth';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import MoreIcon from '@mui/icons-material/MoreVert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { User } from '@/types';
import Link from 'next/link';
import Router from 'next/router';
import { useSession, signOut } from "next-auth/react";
import React, { FormEvent, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getYoutubeSearch, loginSocial } from '../../lib/config';

export default function Header() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession()
  const user: User | null = useSelector((state: RootState) => state.user).user;
  const [refreshToken, setRefreshToken] = useState<boolean>(false);
  const { token } = useAuthToken({refresh: refreshToken});

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const signinHandler = useCallback(async () => {
    try {
      setLoading(true);
      if (status === "loading" || !session) return;
      const { email, name } = session.user || {};
      if (email && name && !user) {
        const bodyFormData = new FormData();
        bodyFormData.append('email', email);
        bodyFormData.append('name', name);

        const response = await fetch(loginSocial, {
          method: 'POST',
          body: bodyFormData
        });

        if (!response.ok) {
          const resData = await response.json();
          if (response.status === 401 || response.status === 422) {
            console.log(resData.message);
            throw new Error('Validation failed.');
          } else {
            console.log('Error!');
            throw new Error('Validation failed!');
          }
        }
  
        const resData = await response.json();
        const userData: User = resData.user;
        dispatch(setUser(userData));
  
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
        localStorage.setItem('token', resData.token);
        localStorage.setItem('expiryDate', expiryDate.toISOString());
      } else {
        return;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, session, status, user]);

  useEffect(() => {
    signinHandler();
  }, [signinHandler]);

  const onSubmitSearch = (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const search_query = searchValue.split(' ').join('+');
    if (token) {
      fetch(getYoutubeSearch + `?search_query=${search_query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const courseId = data[0].courseId;
          Router.push(`/course/${courseId}`);
          setLoading(false);
        });
    }
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSignOut = () => {
    setShowAlert(true);
    if (session) {
      signOut({ redirect: false });
    }
    dispatch(setUser(null));
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    setRefreshToken((prev) => !prev);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showAlert]);

  useEffect(() => {
    setRefreshToken((prev) => !prev);
  }, [user]);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user && <MenuItem sx={{ pointerEvents: 'none', borderBottom: '1px solid' }}><b>{user.name}</b></MenuItem>}
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      {user ? (
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      ) : (
        <MenuItem>
          <Link href="/login" className="text-link">
            Login
          </Link>
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <LocalLibraryIcon />
        </IconButton>
        <p>Courses</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/home" className="text-link">
            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              MaestroAI
            </Typography>
          </Link>
          <form onSubmit={onSubmitSearch}>
            <SearchBar
              placeholder="Search for any topic"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearchValue(e.target.value)}
              loading={loading}
              value={searchValue}
            />
          </form>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="Courses" color="inherit">
              <LocalLibraryIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {<Alert severity="success" message={'You Have Signed Out Successfully!'} visible={showAlert} />}
    </Box>
  );
}
