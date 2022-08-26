import { Stack } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getFavoritedArticle } from '../../api/favorited';
import ArticleCard from '../../components/ArticleCard';
import Paging from '../../components/Paging/Paging';

function Favorite() {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [paging, setPaging] = useState({
    page: 1,
    limit: 5,
    count: 0
  });

  useEffect(() => {
    getFavoritedArticle(id, paging.page, paging.limit)
      .then((res) => {
        setArticles(getArticle(res.data.favorites));
        setPaging((val) => ({ ...val, count: res.data.count }));
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePageChange = (page) => {
    getFavoritedArticle(id, page, paging.limit)
      .then((res) => {
        setArticles(getArticle(res.data.articles));
        setPaging((val) => ({
          ...val,
          page: page
        }));
      })
      .catch((err) => console.log(err));
  };

  const getArticle = (favorites) => {
    return favorites.map((favorite) => favorite.article);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 10 }}>
      <Stack spacing={4}>
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article}></ArticleCard>
        ))}
        <Paging page={paging.page} count={paging.count} onPageChange={handlePageChange} />
      </Stack>
    </Container>
  );
}

export default Favorite;
