import { put, takeEvery, all } from "redux-saga/effects";
import axios from "axios";
import * as types from '../actions/ActionTypes';
import * as actions from '../actions/post';

function* getPosts() {
    const [ post, course ] = yield all([
        axios.get("http://localhost:7070/api/posts"),
        axios.get("http://localhost:7070/api/courses"),
      ])

    try {
        console.log(post.data);
        console.log(course.data);
        post.data.posts.forEach((post)=>{
            course.data.courses.forEach((course)=>{
                if(post.course_id == course.id)
                    post.course_title = course.title
            });
        });

        yield put(actions.getPostsSuccess(post.data));
        
    } catch (error) {
    }
}

export default function* root() {
    yield all([
        takeEvery(types.GET_POSTS, getPosts)
    ]);
}