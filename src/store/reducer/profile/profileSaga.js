import { takeLatest } from "redux-saga/effects";
import { loadProfile, updateProfile } from "./profileAction";
import { LOAD_REQUEST, UPDATE_REQUEST } from "./profileActionTypes";

export default function* watchProfileAction() {
    yield takeLatest(LOAD_REQUEST, loadProfile)
    yield takeLatest(UPDATE_REQUEST, updateProfile)
}