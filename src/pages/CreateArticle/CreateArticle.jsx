import { Container } from '@mui/system';
import React, { useState } from 'react';
import ArticleForm from '../../components/form/ArticleForm';
import { postArticle } from '../../api/article';
import { useNavigate } from 'react-router';

function CreateArticle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (data) => {
    setLoading(true);
    postArticle(data)
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
      <ArticleForm handleSubmit={handleSubmit} isLoading={loading}></ArticleForm>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Container>
  );
}

export default CreateArticle;
