import { UploadFile } from '@mui/icons-material';
import { Avatar, Button, Stack, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_REQUEST } from '../../store/reducer/profile/profileActionTypes';

function EditProfileForm() {
  const { profile, error, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(profile);
  const [formError, setFormError] = useState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputs.username.length > 20) {
      setFormError('Your username are too long');
      return;
    }
    if (inputs.bio.length > 200) {
      setFormError('Your bio are too long');
      return;
    }
    dispatch({ type: UPDATE_REQUEST, payload: inputs });
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <Avatar
          alt="avatar"
          src={inputs.avatar}
          sx={{ width: 100, height: 100, margin: 'auto' }}></Avatar>
        <Container sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<UploadFile />}
            sx={{ maxWidth: 120, margin: 'auto' }}>
            Upload
          </Button>
        </Container>
        <TextField
          name="username"
          type="text"
          value={inputs.username || ''}
          label="Username"
          variant="outlined"
          onChange={handleChange}></TextField>
        <TextField
          name="bio"
          type="text"
          value={inputs.bio || ''}
          label="Bio"
          variant="outlined"
          onChange={handleChange}
          multiline
          rows={5}
          maxRows={10}></TextField>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
        {loading ? (
          <Button type="submit" variant="contained" disabled>
            Save
          </Button>
        ) : (
          <Button type="submit" variant="contained">
            Save
          </Button>
        )}
      </Stack>
    </form>
  );
}

export default EditProfileForm;
