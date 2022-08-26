import { Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';

function EditCommentForm({ content, handleSubmit, handleCancel, mode = 'edit' }) {
  const [inputs, setInputs] = useState(content);
  const [formError, setFormError] = useState();

  const handleChange = (event) => {
    setInputs(() => event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputs.length == 0) {
      setFormError('Your comment is too short');
      return;
    }
    if (inputs.length > 500) {
      setFormError('Your comment is too long');
      return;
    }
    setFormError('');
    handleSubmit(inputs);
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <TextField
          name="comment"
          type="text"
          value={inputs || ''}
          variant="outlined"
          onChange={handleChange}
          multiline
          rows={2}
          maxRows={5}></TextField>
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
        <div style={{ textAlign: 'end' }}>
          {mode == 'edit' ? (
            <Button variant="text" onClick={handleCancel}>
              Cancel
            </Button>
          ) : null}
          <Button type="submit" variant="contained">
            {mode == 'edit' ? 'Save' : 'Post'}
          </Button>
        </div>
      </Stack>
    </form>
  );
}

export default EditCommentForm;
