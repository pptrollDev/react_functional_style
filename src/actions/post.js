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

export function getPost(id) {
    return {
        type: types.GET_POST,
        id: id
    };
}

export function getPostSuccess(data) {
    return {
        type: types.GET_POST_SUCCESS,
        data
    }
};

export function updatePost(id, is_resolved) {
    return {
        type: types.UPDATE_POST,
        id: id,
        is_resolved: is_resolved
    };
}

export function updatePostSuccess(data) {
    return {
        type: types.UPDATE_POST_SUCCESS,
        data
    }
};