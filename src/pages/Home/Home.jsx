import { Container, Stack } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router';
import AddFloatButton from '../../components/AddFloatButton';
import ArticleCard from '../../components/ArticleCard';
import { useSelector } from 'react-redux';

// import styles from './homse.module.css';

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleAddClick = () => {
    navigate('/article/create');
  };

  return (
    <Container maxWidth="sm">
      <Stack>
        <ArticleCard></ArticleCard>
      </Stack>
      {user && <AddFloatButton onClick={handleAddClick} />}
    </Container>
  );
}

export default Home;
