import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { convertDate } from '../util/convertDate';
import { useNavigate } from 'react-router';
import FavoriteButton from './FavoriteButton';

function ArticleCard({ article }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/article/${article._id}`);
  };

  const gotoAuthorProfile = () => {
    navigate(`/profile/${article.author._id}`);
  };

  return (
    <Card variant="outlined">
      <div
        style={{ cursor: 'pointer', borderBottom: '1px solid #f2f2f2' }}
        onClick={handleCardClick}>
        <CardMedia>
          <img
            style={{ width: '100%', height: '250px', objectFit: 'cover' }}
            loading="lazy"
            src={article.thumbnail}
            alt={article.title}></img>
        </CardMedia>
        <CardContent>
          <Typography variant="h5">{article.title}</Typography>
          <Typography variant="body1">{article.subtitle}</Typography>
        </CardContent>
      </div>
      <CardHeader
        avatar={
          <Avatar
            style={{ cursor: 'pointer' }}
            onClick={() => gotoAuthorProfile()}
            src={article.author.avatar}
            alt={article.author.username || 'avartar'}></Avatar>
        }
        action={<FavoriteButton articleID={article._id}></FavoriteButton>}
        title={
          <Typography style={{ cursor: 'pointer' }} onClick={() => gotoAuthorProfile()}>
            {article.author.username || article.author.email}
          </Typography>
        }
        subheader={convertDate(article.createDate)}
      />
    </Card>
  );
}

export default ArticleCard;
