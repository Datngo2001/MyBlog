import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import LoginForm from '../../components/form/LoginForm';
import { SIGNIN_REQUEST } from '../../store/reducer/user/userActionTypes';
import styles from './login.module.css';

function Login() {
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  if (user) {
    return <Navigate to={'/'}></Navigate>;
  }

  const handleLogin = (data) => {
    dispatch({ type: SIGNIN_REQUEST, payload: data });
  };

  return (
    <div className={styles['container']}>
      <div className={styles['form-container']}>
        <h1>Login</h1>
        <LoginForm
          handleSubmit={handleLogin}
          isLoading={loading}
          submitError={error.signin?.message}></LoginForm>
        <p>
          Did not have an account yet? <Link to={'/register'}>Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
