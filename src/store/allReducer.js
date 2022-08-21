import { combineReducers } from 'redux'
import profileReducer from './reducer/profile/profileReducer'
import userReducer from './reducer/user/userReducer'

export default combineReducers({
    user: userReducer,
    profile: profileReducer
})