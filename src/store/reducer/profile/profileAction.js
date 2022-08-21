import { call, put } from "file-loader";
import { getProfile, putProfile } from "../../../api/user";
import { LOAD_FAILURE, LOAD_SUCCESS } from "./profileActionTypes";

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
        const res = yield call(putProfile, payload.id, payload.data)
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