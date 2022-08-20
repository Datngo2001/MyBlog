import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { AppBar, Button } from '@mui/material';
import MenuButton from './MenuButton';
import LinkGroup from './LinkGroup';
import UserMenu from './UserMenu';
import Logo from './Logo';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function Navbar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const pages = [
    {
      title: 'Home',
      link: '/'
    }
  ];
  const userPages = [
    {
      title: 'Profile',
      link: `/profile/${user?._id}`
    },
    {
      title: 'Setting',
      link: '/setting'
    }
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <MenuButton pages={pages}></MenuButton>

          <Logo></Logo>

          <LinkGroup pages={pages}></LinkGroup>
          {user ? (
            <UserMenu items={userPages}></UserMenu>
          ) : (
            <Button variant="outlined" color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
