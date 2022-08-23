import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createPortal } from 'react-dom';

function AddButtonContent({ onClick }) {
  return (
    <Fab
      onClick={onClick}
      color="secondary"
      aria-label="add"
      sx={{ position: 'absolute', bottom: '2rem', right: '2rem' }}>
      <AddIcon />
    </Fab>
  );
}

export default function AddFloatButton({ ...rest }) {
  return createPortal(<AddButtonContent {...rest} />, document.getElementById('root-float-button'));
}
