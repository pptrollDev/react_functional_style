import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions/post';

function DetailPost(){
    const params = useParams();
    const post = useSelector(state => state.post.post);
    const dispatch = useDispatch();
    let optionTags = [];
    
    useEffect(function(){
        getPost();
        
        return function(){
          
        }
      });

    function getPost(){
        dispatch(actions.getPost(params.postId));
    }

    function updatePost(is_resolved){
        dispatch(actions.updatePost(params.postId, is_resolved));
    }

    function handleChange(e){
        e.preventDefault();
        updatePost(e.target.value);
    }

    optionTags.push(
        <option key={true} value={true}>true</option>       
    );
    optionTags.push(
        <option key={false} value={false}>false</option>       
    );

    return (
        <div>
            <div>
                <h2>상세</h2>
            </div>
            <div className="postContainer">
                <div className="panel">
                    <div className="title"><span>질문 해결 여부</span></div>
                    <div>
                        <select value={post.is_resolved} onChange={handleChange}>
                            {optionTags}
                        </select>
                    </div>
                </div>
                <div className="panel">
                    <div className="title"><span>제목</span></div>
                    <div><span id="titleSpan">{post.title}</span></div>
                </div>
                <div className="panel">
                <div className="title"><span>작성 시간</span></div>
                    <div><span id="createdSpan">{post.created_at}</span></div>
                </div>
                <div className="panel">
                    <div className="title"><span>작성자</span></div>
                    <div><span id="authorSpan">{post.author}</span></div>
                </div>
                <div className="panel">
                    <div className="title"><span>연관 강의</span></div>
                    <div><span id="courseSpan">{post.course_title}</span></div>
                </div>
                <div className="panel">
                    <div className="title"><span>본문</span></div>
                    <div><span id="contentSpan">{post.body}</span></div>
                </div> 
            </div>
        </div>
    )
}

export default DetailPost;