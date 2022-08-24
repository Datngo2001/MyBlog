import { Avatar, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { deleteArticle, getArticleById } from '../../api/article';
import { convertDate } from '../../util/convertDate';
import styles from './view.module.css';
import EditFloatButton from '../../components/EditFloatButton';
import DeleteFloatButton from '../../components/DeleteFloatButton';
import { useSelector } from 'react-redux';
import ConfirmModal from '../../components/modal/ConfirmModal';

function ViewArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getArticleById(id)
      .then((res) => {
        setArticle(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const gotoAuthorProfile = () => {
    navigate(`/profile/${article.author._id}`);
  };

  const handleEditClick = () => {
    navigate(`/article/${article?._id}/edit`);
  };

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleAnswer = (result) => {
    setOpen(false);
    if (result == true) {
      deleteArticle(id)
        .then(() => {
          navigate('/');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Container maxWidth="sm">
      {article && (
        <>
          <Stack spacing={2} alignItems={'center'} sx={{ marginTop: 2 }}>
            <img
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              src={article?.thumbnail}
              alt={article?.title}
            />
            <Stack spacing={2}>
              <div className={styles['author-container']}>
                <div className={styles['author']}>
                  <Avatar
                    onClick={() => gotoAuthorProfile()}
                    style={{ cursor: 'pointer' }}
                    src={article?.author.avatar}
                    alt={article?.author.username || 'avartar'}></Avatar>
                  <Typography style={{ cursor: 'pointer' }} onClick={() => gotoAuthorProfile()}>
                    {article?.author.username || article?.author.email}
                  </Typography>
                </div>
                <Typography>{convertDate(article?.createDate)}</Typography>
              </div>
              <Typography variant="h4">{article?.title}</Typography>
              <Typography variant="h6">{article?.subtitle}</Typography>
              <Typography variant="body1" sx={{ lineHeight: 2, textAlign: 'justify' }}>
                {article?.content}
              </Typography>
            </Stack>
          </Stack>
          {user?._id === article?.author._id ? (
            <>
              <DeleteFloatButton onClick={handleDeleteClick} />
              <EditFloatButton onClick={handleEditClick} />
            </>
          ) : null}
        </>
      )}
      <ConfirmModal
        message={'Are you sure to delete article?'}
        open={open}
        onAnswer={handleAnswer}
      />
    </Container>
  );
}

export default ViewArticle;
