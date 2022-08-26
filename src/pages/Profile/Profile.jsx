import { Avatar, Button, CircularProgress, Container, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { LOAD_REQUEST } from '../../store/reducer/profile/profileActionTypes';
import EditFloatButton from '../../components/FloatButton/EditFloatButton';
import EditProfileModal from '../../components/modal/EditProfileModal';
import ArticleOfAuthor from '../../components/ArticleOfAuthor';
import FloatButtonContainer from '../../components/FloatButton/FloatButtonContainer';
import Favorite from '@mui/icons-material/Favorite';

function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: LOAD_REQUEST, payload: id });
  }, []);

  const handleEditOpen = () => {
    setShowEdit(true);
  };

  const handleEditClose = () => {
    setShowEdit(false);
  };

  const handleFavoriteClick = () => {
    navigate(`/profile/${id}/favorite`);
  };

  return (
    <Container maxWidth="sm">
      <Stack spacing={2} sx={{ marginTop: 4 }}>
        {!profile ? (
          <CircularProgress sx={{ margin: 'auto' }} />
        ) : (
          <>
            <Avatar
              alt="avatar"
              src={profile.avatar}
              sx={{ width: 150, height: 150, margin: 'auto' }}
            />
            <Typography variant="h5" sx={{ margin: 'auto', textAlign: 'center' }}>
              {profile.username || profile.email}
            </Typography>
            <Typography variant="body1" sx={{ margin: 'auto', textAlign: 'center' }}>
              {profile.bio}
            </Typography>
            <Container sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="error"
                startIcon={<Favorite />}
                onClick={handleFavoriteClick}>
                Favorite
              </Button>
            </Container>
            {id === user?._id ? (
              <FloatButtonContainer>
                <EditFloatButton onClick={handleEditOpen} />
              </FloatButtonContainer>
            ) : null}
            <ArticleOfAuthor authorId={profile._id}></ArticleOfAuthor>
          </>
        )}
      </Stack>
      <EditProfileModal open={showEdit} onClose={handleEditClose} />
    </Container>
  );
}

export default React.memo(Profile);
