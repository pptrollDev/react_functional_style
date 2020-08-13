import * as types from '../actions/ActionTypes';

const initialState = {
    courses: []
};

export default function post(state = initialState, action) {
    switch(action.type) {
        case types.GET_COURSES_SUCCESS:
            return {
                ...state,
                courses: action.data.courses
            }
        default:
            return state;
    }
}
