import Delete from '@mui/icons-material/Delete';
import ModeEdit from '@mui/icons-material/ModeEdit';
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { convertDate } from '../../util/convertDate';
import EditCommentForm from '../form/EditCommentForm';
import ConfirmModal from '../modal/ConfirmModal';

function Comment({ comment, handleEdit, handleDelete }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [editing, setEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const gotoUserProfile = () => {
    navigate(`/profile/${comment?.user._id}`);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleEditCancel = () => {
    setEditing(false);
  };

  const handleEditSubmit = (data) => {
    handleEdit(comment._id, data);
    setEditing(false);
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleDeleteConfirm = (result) => {
    setShowConfirm(false);
    if (result) {
      handleDelete(comment._id);
    }
  };

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar
            style={{ cursor: 'pointer' }}
            onClick={() => gotoUserProfile()}
            src={comment.user.avatar}
            alt={comment.user.username || 'avartar'}></Avatar>
        }
        action={
          user?._id === comment?.user._id ? (
            <Stack spacing={2} direction="row">
              <IconButton aria-label="settings" onClick={handleEditClick}>
                <ModeEdit />
              </IconButton>
              <IconButton aria-label="settings" onClick={handleDeleteClick}>
                <Delete />
              </IconButton>
            </Stack>
          ) : null
        }
        title={
          <Typography style={{ cursor: 'pointer' }} onClick={() => gotoUserProfile()}>
            {comment.user.username || comment.user.email}
          </Typography>
        }
        subheader={convertDate(comment.createDate)}
      />
      {editing ? (
        <div style={{ margin: '0px 20px', marginBottom: '20px' }}>
          <EditCommentForm
            mode="edit"
            content={comment.content}
            handleSubmit={handleEditSubmit}
            handleCancel={handleEditCancel}></EditCommentForm>
        </div>
      ) : (
        <CardContent>{comment.content}</CardContent>
      )}
      <ConfirmModal
        message={'Are you sure to delete comment?'}
        open={showConfirm}
        onAnswer={handleDeleteConfirm}></ConfirmModal>
    </Card>
  );
}

export default Comment;
