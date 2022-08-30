import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteFavorited, getFavoritedByArticle, postFavorited } from '../api/favorited';

function FavoriteButton({ articleID }) {
  const { user } = useSelector((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!user) return;
    getFavoritedByArticle(articleID)
      .then((res) => {
        if (res.data) {
          setIsFavorite(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFavoriteClick = () => {
    if (!user) return;
    setIsFavorite((val) => !val);
    if (isFavorite) {
      deleteFavorited(articleID).catch((err) => console.log(err));
    } else {
      postFavorited(articleID).catch((err) => console.log(err));
    }
  };

  return (
    <IconButton color="error" onClick={handleFavoriteClick}>
      {user && isFavorite && <FavoriteIcon />}
      {(!user || !isFavorite) && <FavoriteBorderIcon />}
    </IconButton>
  );
}

export default FavoriteButton;
