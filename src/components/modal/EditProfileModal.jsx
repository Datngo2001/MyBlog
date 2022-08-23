import { Card, CardContent, Modal } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { createPortal } from 'react-dom';
import EditProfileForm from '../form/EditProfileForm';

function ModalContent({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Container
        maxWidth="xs"
        sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Card>
          <CardContent>
            <EditProfileForm></EditProfileForm>
          </CardContent>
        </Card>
      </Container>
    </Modal>
  );
}

export default function EditProfileModal({ ...rest }) {
  return createPortal(<ModalContent {...rest} />, document.getElementById('root-modal'));
}
