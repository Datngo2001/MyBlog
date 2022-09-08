import { Box, CircularProgress, Stack } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getFavoritedArticle } from '../../api/favorited';
import ArticleCard from '../../components/ArticleCard';
import Paging from '../../components/Paging/Paging';

function Favorite() {
  const { id } = useParams();
  const [articles, setArticles] = useState();
  const [paging, setPaging] = useState({
    page: 1,
    limit: 5,
    count: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFavoritedArticle(id, paging.page, paging.limit)
      .then((res) => {
        setArticles(getArticle(res.data.favorites));
        setPaging((val) => ({ ...val, count: res.data.count }));
      })
      .catch((err) => console.log(err));
  }, [id, paging.limit, paging.page]);

  const handlePageChange = (page) => {
    setLoading(true);
    getFavoritedArticle(id, page, paging.limit)
      .then((res) => {
        setArticles(getArticle(res.data.favorites));
        setPaging((val) => ({
          ...val,
          page: page
        }));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const getArticle = (favorites) => {
    return favorites.map((favorite) => favorite.article);
  };

  const renderArticle = () => {
    if (articles.length == 0) {
      return (
        <Box sx={{ typography: 'h5', textAlign: 'center' }}>User has no favorited article yet!</Box>
      );
    } else {
      return (
        <>
          {!loading &&
            articles.map((article) => (
              <ArticleCard key={article._id} article={article}></ArticleCard>
            ))}
          {loading && <CircularProgress sx={{ margin: 'auto' }} />}
          <Paging page={paging.page} count={paging.count} onPageChange={handlePageChange} />
        </>
      );
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 10 }}>
      <Stack spacing={4}>
        {articles ? renderArticle() : <CircularProgress sx={{ margin: 'auto' }} />}
      </Stack>
    </Container>
  );
}

export default Favorite;
