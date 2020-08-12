import * as types from './ActionTypes';

export function getPosts() {
    return {
        type: types.GET_POSTS
    };
}

export function getPostsSuccess(data) {
    return {
        type: types.GET_POSTS_SUCCESS,
        data
    }
};