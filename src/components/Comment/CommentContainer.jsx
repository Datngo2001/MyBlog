import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { deleteComment, getCommentByArticle, postComment, putComment } from '../../api/comment';
import EditCommentForm from '../form/EditCommentForm';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CommentContainer({ article }) {
  const { user } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentByArticle(article?._id)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id, content) => {
    putComment(id, content)
      .then((res) => {
        setComments((comments) =>
          comments.map((comment) => {
            if (comment._id == id) {
              comment.content = res.data.content;
            }
            return comment;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    deleteComment(id)
      .then(() => {
        setComments((comments) => comments.filter((comment) => comment._id != id));
      })
      .catch((err) => console.log(err));
  };

  const handlePost = (content) => {
    postComment(article?._id, content)
      .then((res) => {
        res.data.user = user;
        setComments((val) => [res.data, ...val]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Stack spacing={2}>
      {user ? (
        <EditCommentForm content={''} mode="create" handleSubmit={handlePost}></EditCommentForm>
      ) : (
        <div style={{ textAlign: 'center' }}>
          Login to write your comment. <Link to={'/login'}>login</Link>
        </div>
      )}
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </Stack>
  );
}

export default CommentContainer;
