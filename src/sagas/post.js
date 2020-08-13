import { put, takeEvery, all } from "redux-saga/effects";
import axios from "axios";
import * as types from '../actions/ActionTypes';
import * as actions from '../actions/post';

function* getPosts() {
    const [ post, course ] = yield all([
        axios.get("http://localhost:7070/api/posts"),
        axios.get("http://localhost:7070/api/courses"),
      ]);

    try {
        post.data.posts.forEach((post)=>{
            course.data.courses.forEach((course)=>{
                if(post.course_id === course.id)
                    post.course_title = course.title
            });
        });

        yield put(actions.getPostsSuccess(post.data));
        
    } 
    catch (error) {
    }
}

function* getPost(action) {
    const [ post, course ] = yield all([
        axios.get("http://localhost:7070/api/posts/"+action.id),
        axios.get("http://localhost:7070/api/courses"),
    ]);

    try {
        course.data.courses.forEach((course)=>{
            if(post.data.post.course_id === course.id)
                post.data.post.course_title = course.title
        });

        yield put(actions.getPostSuccess(post.data));
        
    } 
    catch (error) {
    }
}

function* updatePost(action) {
    const [ post ] = yield all([
        axios.put("http://localhost:7070/api/posts/"+action.id+"/is_resolved",{
            is_resolved: action.is_resolved
        })
    ]);

    try {
        yield put(actions.updatePostSuccess(post.data));
    } 
    catch (error) {
    }
}

export default function* root() {
    yield all([
        takeEvery(types.GET_POSTS, getPosts),
        takeEvery(types.GET_POST, getPost),
        takeEvery(types.UPDATE_POST, updatePost)
    ]);
}