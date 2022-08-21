import { LOAD_FAILURE, LOAD_REQUEST, LOAD_SUCCESS, UPDATE_FAILURE, UPDATE_REQUEST, UPDATE_SUCCESS } from './profileActionTypes'

const init = {
    profile: null,
    loading: false,
    error: null
}

export default function profileReducer(state = init, { type, payload }) {
    switch (type) {
        case LOAD_REQUEST:
        case UPDATE_REQUEST:
            return { loading: true, profile: null, error: null };
        case LOAD_FAILURE:
        case UPDATE_FAILURE:
            return { loading: false, profile: null, error: payload };
        case LOAD_SUCCESS:
        case UPDATE_SUCCESS:
            return { loading: false, user: payload, error: null };
        default:
            return state;
    }
}