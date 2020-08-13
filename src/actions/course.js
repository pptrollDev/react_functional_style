import * as types from './ActionTypes';

export function getCourses() {
    console.log('getCourses');
    return {
        type: types.GET_COURSES
    };
}

export function getCourseSuccess(data) {
    console.log('getCourseSuccess')
    return {
        type: types.GET_COURSES_SUCCESS,
        data
    }
};