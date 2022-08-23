import { Fab } from '@mui/material';
import React from 'react';
import { createPortal } from 'react-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function EditButtonContent({ onClick }) {
  return (
    <Fab
      onClick={onClick}
      color="secondary"
      aria-label="edit"
      sx={{ position: 'absolute', bottom: '2rem', right: '2rem' }}>
      <ModeEditIcon />
    </Fab>
  );
}

export default function EditFloatButton({ ...rest }) {
  return createPortal(
    <EditButtonContent {...rest} />,
    document.getElementById('root-float-button')
  );
}
