import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RESTORE_USER } from './store/reducer/user/userActionTypes';
import './App.css';
import Cookies from 'universal-cookie';
import { Route, Routes } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Setting from './pages/Setting/Setting';
import EditArticle from './pages/EditArticle/EditArticle';
import CreateArticle from './pages/CreateArticle/CreateArticle';
import Navbar from './layout/Navbar';
import ViewArticle from './pages/ViewArticle/ViewArticle';
import Footer from './pages/Footer/Footer';

const cookies = new Cookies();

const App = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!user) {
    const prevUser = cookies.get('user');
    const prevToken = cookies.get('token');
    if (prevUser && prevToken) {
      dispatch({ type: RESTORE_USER, payload: prevUser });
    }
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="app-route-container">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute condition={user} redirectPath="/">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/setting"
            element={
              <ProtectedRoute condition={user} redirectPath="/">
                <Setting />
              </ProtectedRoute>
            }
          />
          <Route path="/article/:id" element={<ViewArticle />} />
          <Route
            path="/article/create"
            element={
              <ProtectedRoute condition={user} redirectPath="/">
                <CreateArticle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/article/:id/edit"
            element={
              <ProtectedRoute condition={user} redirectPath="/">
                <EditArticle />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;
