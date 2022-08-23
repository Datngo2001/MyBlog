import { call, put } from 'redux-saga/effects';
import { getProfile, putProfile } from "../../../api/user";
import { LOAD_FAILURE, LOAD_SUCCESS, UPDATE_FAILURE, UPDATE_SUCCESS } from "./profileActionTypes";

export function* loadProfile({ payload }) {
    try {
        const res = yield call(getProfile, payload)
        yield put({
            type: LOAD_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        yield put({
            type: LOAD_FAILURE,
            payload: error
        })
    }
}

export function* updateProfile({ payload }) {
    try {
        const res = yield call(putProfile, payload)
        yield put({
            type: UPDATE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        yield put({
            type: UPDATE_FAILURE,
            payload: error
        })
    }
}