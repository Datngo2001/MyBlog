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
    limit: 5,
    count: 0,
    keyword: ''
  });

  const handleAddClick = () => {
    navigate('/article/create');
  };

  useEffect(() => {
    getArticles('', paging.page, paging.limit)
      .then((res) => {
        setArticles(res.data.articles);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (keyword) => {
    getArticles(keyword, 1, paging.limit)
      .then((res) => {
        setArticles(res.data.articles);
        setPaging((val) => ({ ...val, page: 1, count: res.data.count, keyword: keyword }));
      })
      .catch((err) => console.log(err));
  };

  const handlePageChange = (page) => {
    getArticles(paging.keyword, page, paging.limit)
      .then((res) => {
        setArticles(res.data.articles);
        setPaging((val) => ({
          ...val,
          page: page
        }));
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
        <Paging page={paging.page} count={paging.count} onPageChange={handlePageChange} />
      </Stack>
      {user && <AddFloatButton onClick={handleAddClick} />}
    </Container>
  );
}

export default Home;
