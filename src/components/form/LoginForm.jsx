import { Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';

function LoginForm({ handleSubmit, isLoading }) {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!(inputs.email || inputs.password)) {
      setError('Email or password must be inputed');
      return;
    }
    handleSubmit(inputs);
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <TextField
          name="email"
          value={inputs.email || ''}
          label="Email Address"
          variant="outlined"
          onChange={handleChange}></TextField>
        <TextField
          name="password"
          type="password"
          value={inputs.password || ''}
          onChange={handleChange}
          label="Password"
          variant="outlined"></TextField>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {isLoading ? (
          <Button type="submit" variant="contained" disabled>
            Login
          </Button>
        ) : (
          <Button type="submit" variant="contained">
            Login
          </Button>
        )}
      </Stack>
    </form>
  );
}

export default LoginForm;
