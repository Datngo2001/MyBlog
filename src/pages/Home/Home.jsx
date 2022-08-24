import { Container, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AddFloatButton from '../../components/AddFloatButton';
import ArticleCard from '../../components/ArticleCard';
import { useSelector } from 'react-redux';
import { getArticles } from '../../api/article';

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [articles, setArticles] = useState([]);

  const handleAddClick = () => {
    navigate('/article/create');
  };

  useEffect(() => {
    getArticles('', 1, 10)
      .then((res) => setArticles(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 5 }}>
      <Stack spacing={4}>
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article}></ArticleCard>
        ))}
      </Stack>
      {user && <AddFloatButton onClick={handleAddClick} />}
    </Container>
  );
}

export default Home;
