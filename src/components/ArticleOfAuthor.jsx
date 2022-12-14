import { Box, CircularProgress, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getArticlesByAuthor } from '../api/article';
import ArticleCard from './ArticleCard';
import ArticleSearchForm from './form/ArticleSearchForm';
import Paging from './Paging/Paging';

function ArticleOfAuthor({ authorId }) {
  const [articles, setArticles] = useState();
  const [paging, setPaging] = useState({
    page: 1,
    limit: 5,
    count: 0,
    keyword: ''
  });

  useEffect(() => {
    getArticlesByAuthor('', paging.page, paging.limit, authorId)
      .then((res) => {
        setArticles(res.data.articles);
        setPaging((val) => ({ ...val, count: res.data.count }));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (keyword) => {
    getArticlesByAuthor(keyword, 1, paging.limit, authorId)
      .then((res) => {
        setArticles(res.data.articles);
        setPaging((val) => ({ ...val, page: 1, count: res.data.count, keyword: keyword }));
      })
      .catch((err) => console.log(err));
  };

  const handlePageChange = (page) => {
    getArticlesByAuthor(paging.keyword, page, paging.limit, authorId)
      .then((res) => {
        setArticles(res.data.articles);
        setPaging((val) => ({
          ...val,
          page: page
        }));
      })
      .catch((err) => console.log(err));
  };

  const renderArticles = () => {
    if (articles.length == 0) {
      return <Box sx={{ typography: 'h5', textAlign: 'center' }}>User has no article yet!</Box>;
    } else {
      return (
        <>
          <ArticleSearchForm handleSubmit={handleSubmit} />
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article}></ArticleCard>
          ))}
          <Paging page={paging.page} count={paging.count} onPageChange={handlePageChange} />
        </>
      );
    }
  };

  return (
    <Stack spacing={4}>
      {articles ? renderArticles() : <CircularProgress sx={{ margin: 'auto' }} />}
    </Stack>
  );
}

export default ArticleOfAuthor;
