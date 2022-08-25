import { Container, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AddFloatButton from '../../components/AddFloatButton';
import ArticleCard from '../../components/ArticleCard';
import { useSelector } from 'react-redux';
import { getArticles } from '../../api/article';
import ArticleSearchForm from '../../components/form/ArticleSearchForm';
import Paging from '../../components/Paging/Paging';

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [articles, setArticles] = useState([]);
  const [paging, setPaging] = useState({
    page: 1,
    limit: 10,
    count: 0
  });

  const handleAddClick = () => {
    navigate('/article/create');
  };

  useEffect(() => {
    getArticles('', 1, 10)
      .then((res) => {
        setArticles(res.data.articles);
        setPaging({ page: 1, limit: 10, count: res.data.count });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (keyword) => {
    getArticles(keyword, 1, 10)
      .then((res) => {
        setArticles(res.data.articles);
        setPaging({ page: 1, limit: 10, count: res.data.count });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 5 }}>
      <Stack spacing={4}>
        <ArticleSearchForm handleSubmit={handleSubmit} />
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article}></ArticleCard>
        ))}
        <Paging page={paging.page} count={paging.count} />
      </Stack>
      {user && <AddFloatButton onClick={handleAddClick} />}
    </Container>
  );
}

export default Home;
