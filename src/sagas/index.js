import { all, fork } from "redux-saga/effects";
import course from './course';
import post from './post';

export default function* rootSaga() {
    yield all([
        fork(course),
        fork(post)
    ])
}