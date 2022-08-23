import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { convertDate } from '../util/convertDate';

function ArticleCard({ article }) {
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar src={article.author.avatar} alt={article.author.username || 'avartar'}></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={article.author.username || article.author.email}
        subheader={convertDate(article.createDate)}
      />
      <CardMedia
        component="img"
        height="250"
        image={article.thumbnail}
        alt={article.title}></CardMedia>
      <CardContent>
        <Typography variant="h5">{article.title}</Typography>
        <Typography variant="body1">{article.subtitle}</Typography>
      </CardContent>
    </Card>
  );
}

export default ArticleCard;
