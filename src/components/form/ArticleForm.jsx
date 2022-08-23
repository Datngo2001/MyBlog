import { Button, TextField } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import RichTextEditor from '../RichTextEditor';

const init = {
  title: '',
  subtitle: '',
  content: '',
  thumbnail: ''
};

function ArticleForm({ data = init, handleSubmit, isLoading }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(data);
  const [formError, setFormError] = useState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputs.title) {
      setFormError('Please input title');
      return;
    }
    if (inputs.title.length > 200) {
      setFormError('Your title are too long');
      return;
    }
    handleSubmit(inputs);
  };

  const handleContentChange = useCallback((newContent) => {
    setInputs((values) => ({ ...values, content: newContent }));
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ paddingTop: 5, paddingBottom: 5 }}>
        <TextField
          name="thumbnail"
          type="text"
          value={inputs.thumbnail || ''}
          label="Thumbnail link"
          variant="outlined"
          onChange={handleChange}></TextField>
        <TextField
          name="title"
          type="text"
          value={inputs.title || ''}
          label="Title"
          variant="outlined"
          onChange={handleChange}></TextField>
        <TextField
          name="subtitle"
          type="text"
          value={inputs.subtitle || ''}
          label="Subtitle"
          variant="outlined"
          onChange={handleChange}
          multiline
          rows={3}
          maxRows={10}></TextField>
        <RichTextEditor handleBlur={handleContentChange}></RichTextEditor>
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
        <Container sx={{ textAlign: 'end' }}>
          <Button type="submit" variant="text" onClick={() => navigate('/')}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            Save
          </Button>
        </Container>
      </Stack>
    </form>
  );
}

export default ArticleForm;
