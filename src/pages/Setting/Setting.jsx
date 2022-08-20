import { Button, Container } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../store/reducer/user/userActionTypes';
function Setting() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };
  return (
    <div>
      <Container maxWidth="xs" sx={{ marginTop: '30px' }}>
        <Stack spacing={2}>
          <Button onClick={handleLogout} variant="contained" sx={{ margin: 'auto', width: '100' }}>
            Logout
          </Button>
        </Stack>
      </Container>
    </div>
  );
}

export default Setting;
