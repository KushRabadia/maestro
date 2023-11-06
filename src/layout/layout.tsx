import Header from './header';
import Box from '@mui/material/Box';

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
