import * as types from './ActionTypes';

export function getCourses(post) {
    return {
        type: types.GET_COURSES,
        post
    };
}

export function getCourseSuccess(data) {
    return {
        type: types.GET_COURSES_SUCCESS,
        data
    }
};