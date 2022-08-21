import { all } from "redux-saga/effects";
import watchProfileAction from "./reducer/profile/profileSaga";
import watchUserAction from "./reducer/user/userSaga";

export default function* rootSaga() {
    yield all([watchUserAction(), watchProfileAction()])
}