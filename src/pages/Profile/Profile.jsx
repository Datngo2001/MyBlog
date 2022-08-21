import { Avatar, Container } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getProfile } from '../../api/user';

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState();

  useEffect(() => {
    getProfile(id)
      .then((res) => {
        setProfile(() => res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Container maxWidth="xs">
      <Stack>
        <Avatar
          alt="Remy Sharp"
          src={'/static/images/avatar/1.jpg'}
          sx={{ width: 56, height: 56 }}
        />
      </Stack>
    </Container>
  );
}

export default Profile;
