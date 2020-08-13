import { combineReducers } from 'redux';
import post from './post';
import course from './course';


const reducers = combineReducers({
    post,
    course
});

export default reducers;
