import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

function UserMenu({ items }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = (link) => {
    return () => {
      setAnchorElUser(null);
      navigate(link);
    };
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="avatar" src={user?.avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        {items.map((item) => (
          <MenuItem key={item.title} onClick={handleMenuClick(item.link)}>
            <Typography textAlign="center">{item.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default UserMenu;
