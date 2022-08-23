import { call, put } from 'redux-saga/effects'
import { login, register as registerApi } from '../../../api/auth'
import { SIGNIN_FAILURE, SIGNIN_SUCCESS, REGISTER_SUCCESS, REGISTER_FAILURE } from './userActionTypes'


export function* signin({ payload }) {
    try {
        const response = yield call(login, payload)
        yield put({
            type: SIGNIN_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        yield put({
            type: SIGNIN_FAILURE,
            payload: error
        })
    }
}


export function* register({ payload }) {
    try {
        const response = yield call(registerApi, payload)
        yield put({
            type: REGISTER_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        yield put({
            type: REGISTER_FAILURE,
            payload: error
        })
    }
}