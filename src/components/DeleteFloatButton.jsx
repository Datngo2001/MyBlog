import { Fab } from '@mui/material';
import React from 'react';
import { createPortal } from 'react-dom';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteButtonContent({ onClick }) {
  return (
    <Fab
      onClick={onClick}
      color="secondary"
      aria-label="edit"
      sx={{ position: 'fixed', bottom: '6rem', right: '2rem' }}>
      <DeleteIcon />
    </Fab>
  );
}

export default function DeleteFloatButton({ ...rest }) {
  return createPortal(
    <DeleteButtonContent {...rest} />,
    document.getElementById('root-float-button')
  );
}
