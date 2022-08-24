import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getArticleById, putArticle } from '../../api/article';
import ArticleForm from '../../components/form/ArticleForm';
import CircularProgress from '@mui/material/CircularProgress';

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    getArticleById(id)
      .then((res) => {
        setCurrent(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (data) => {
    setLoading(true);
    putArticle(id, data)
      .then((res) => {
        setLoading(false);
        navigate(`/article/${res.data._id}`);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };
  return (
    <Container maxWidth="md">
      {current ? (
        <ArticleForm data={current} handleSubmit={handleSubmit} isLoading={loading}></ArticleForm>
      ) : (
        <div style={{ paddingTop: '20px' }}>
          <CircularProgress sx={{ margin: 'auto' }} />
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Container>
  );
}

export default EditArticle;
