import './ListPost.css';
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions/post';

function ListPost() {
  const posts = useSelector(state => state.post.posts);
  const dispatch = useDispatch();
  let listTags = [];
  let addBtnTag = '';

  useEffect(function(){
    getPosts();
    
    return function(){
      
    }
  });

  function getPosts(){
    dispatch(actions.getPosts());
  }

  listTags.push(
    <div key="header" className="header-panel">
        <div className="author-div">작성자</div>
        <div className="title-div">제목</div>
        <div className="createdAt-div">작성 시간</div>
        <div className="course-div">연간 강의</div>
        <div className="isResolved-div">질문 해결 여부</div>
    </div>
  );

  posts.forEach((post)=>{
    listTags.push(
      <div key={post.id} className="body-panel">
          <div className="author-div">{post.author}</div>
          <div className="title-div">
              <a href={"/detailpost/"+post.id}>{post.title}</a>
          </div>
          <div className="createdAt-div">{post.created_at}</div>
          <div className="course-div">{post.course_title}</div>
          <div className="isResolved-div">{post.is_resolved.toString()}</div>
      </div>);
  });

  addBtnTag = <div><a href="/addpost">추가</a></div>

  return (
    <div className="listPost">
      <h2>리스트</h2>
      {listTags}
      {addBtnTag}
    </div>
  );
}

export default ListPost;
