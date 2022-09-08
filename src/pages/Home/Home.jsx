import { Container, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import AddFloatButton from '../../components/FloatButton/AddFloatButton';
import ArticleCard from '../../components/ArticleCard';
import { useSelector } from 'react-redux';
import { getArticles } from '../../api/article';
import ArticleSearchForm from '../../components/form/ArticleSearchForm';
import Paging from '../../components/Paging/Paging';
import FloatButtonContainer from '../../components/FloatButton/FloatButtonContainer';
import { useNavigate } from 'react-router';
import { CircularProgress } from '@mui/material';

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getArticles('', paging.page, paging.limit)
      .then((res) => {
        setArticles(res.data.articles);
        setPaging((val) => ({ ...val, count: res.data.count }));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [paging.limit, paging.page]);

  const handleSubmit = (keyword) => {
    setLoading(true);
    getArticles(keyword, 1, paging.limit)
      .then((res) => {
        setArticles(res.data.articles);
        setPaging((val) => ({ ...val, page: 1, count: res.data.count, keyword: keyword }));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handlePageChange = (page) => {
    setLoading(true);
    getArticles(paging.keyword, page, paging.limit)
      .then((res) => {
        setArticles(res.data.articles);
        setPaging((val) => ({
          ...val,
          page: page
        }));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleAddClick = () => {
    navigate(`/article/create`);
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 5 }}>
      <Stack spacing={4}>
        <ArticleSearchForm handleSubmit={handleSubmit} />
        <div style={{ textAlign: 'center' }}>{loading && <CircularProgress />}</div>
        {!loading &&
          articles.map((article) => (
            <ArticleCard key={article._id} article={article}></ArticleCard>
          ))}
        <Paging page={paging.page} count={paging.count} onPageChange={handlePageChange} />
      </Stack>
      {user && (
        <FloatButtonContainer>
          <AddFloatButton onClick={handleAddClick} />
        </FloatButtonContainer>
      )}
    </Container>
  );
}

export default Home;
