import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function ArticleSearchForm({ handleSubmit }) {
  const [keyword, setKeyword] = useState('');

  const handleChange = (event) => {
    setKeyword(() => event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(keyword);
  };

  return (
    <Paper
      onSubmit={onSubmit}
      component="form"
      variant="outlined"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search article"
        value={keyword}
        onChange={handleChange}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
export default React.memo(ArticleSearchForm);
