import * as types from '../actions/ActionTypes';

const initialState = {
    posts: [],
    post: {}
};

export default function post(state = initialState, action) {
    switch(action.type) {
        case types.GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.data.posts
            }
            case types.GET_POST_SUCCESS:
                return {
                    ...state,
                    post: action.data.post
                }
            case types.UPDATE_POST_SUCCESS:
                return {
                    ...state,
                    post: {
                        ...state.post,
                        is_resolved: action.data.post.is_resolved
                    }
                }
        default:
            return state;
    }
}
