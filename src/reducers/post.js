import * as types from '../actions/ActionTypes';

const initialState = {
    posts: []
};

export default function post(state = initialState, action) {
    switch(action.type) {
        case types.GET_POSTS:
            return {...state};
        case types.GET_POSTS_SUCCESS:
            console.log('GET_POSTS_SUCCESS');
            return {
                ...state,
                posts: action.data.posts
            }
        default:
            return state;
    }
}
