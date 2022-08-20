import React from 'react';
import { Dropdown } from 'bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../store/reducer/user/userActionTypes';
import { useNavigate } from 'react-router';
import { DropdownButton } from 'react-bootstrap';

function UserDropDown() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      type: LOGOUT
    });
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <DropdownButton title={user.email}>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>  
    </DropdownButton>
  );
}

export default UserDropDown;
