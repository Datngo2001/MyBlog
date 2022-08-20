import Cookies from "universal-cookie";

import { LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, RESTORE_USER, SIGNIN_FAILURE, SIGNIN_REQUEST, SIGNIN_SUCCESS } from "./userActionTypes";

const init = {
    user: null,
    loading: false,
    error: { signin: null, register: null }
}

const cookies = new Cookies();

export default function userReducer(state = init, { type, payload }) {
    switch (type) {
        case RESTORE_USER:
            return { loading: false, user: payload, error: { signin: null, register: null } };
        case SIGNIN_REQUEST:
        case REGISTER_REQUEST:
            return { loading: true, user: null, error: { signin: null, register: null } };
        case SIGNIN_FAILURE:
            return { loading: false, user: null, error: { ...state.error, signin: payload } };
        case REGISTER_FAILURE:
            return { loading: false, user: null, error: { ...state.error, register: payload } };
        case SIGNIN_SUCCESS:
        case REGISTER_SUCCESS:
            return { loading: false, user: payload, error: { signin: null, register: null } };
        case LOGOUT:
            cookies.remove('token')
            cookies.remove('user')
            return { loading: null, user: payload, error: { signin: null, register: null } };
        default:
            return state;
    }
}