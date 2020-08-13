import { put, takeEvery, all } from "redux-saga/effects";
import axios from "axios";
import * as types from '../actions/ActionTypes';
import * as courseActions from '../actions/course';

function* getCourses() {
    const [ course ] = yield all([
        axios.get("http://localhost:7070/api/courses")
      ]);
    
    try {
        yield put(courseActions.getCourseSuccess(course.data));
        
    } 
    catch (error) {
    }
}

export default function* root() {
    yield all([
        takeEvery(types.GET_COURSES, getCourses)
    ]);
}