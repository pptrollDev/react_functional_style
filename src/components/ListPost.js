import './ListPost.css';
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions/post';

function ListPost() {
  // const [posts, setPosts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [options, setOptions] = useState({
    count: 0,
    current_page: 1,
    records_per_page: 10,
    searchStr: '',
    is_resolved: ''
  });

  const posts = useSelector(state => state.post.posts);
  const dispatch = useDispatch();

  useEffect(function(){
    getPosts();
    
    return function(){
      
    }
  }, []);

  function getPosts(){
    dispatch(actions.getPosts());
  }

  // function getPosts(){
  //   let newCourses = [];
  //   let newPosts = [];

  //   fetch('http://localhost:7070/api/courses')
  //   .then(function(response){
  //       return response.json();
  //   })
  //   .then(function(json){
  //       newCourses = json.courses;

  //       fetch('http://localhost:7070/api/posts?is_resolved='+options.is_resolved+'&page='+options.current_page+'&s='+options.searchStr)
  //       .then(function(response){
  //           return response.json();
  //       })
  //       .then(function(json){
  //           newPosts = json.posts;

  //           if(options.searchStr || options.is_resolved!='')
  //             options.count = 1;
  //           else
  //             options.count = json.count;

  //           setOptions(options);
            
  //           newPosts.forEach((post)=>{
  //               newCourses.forEach((course)=>{
  //                   if(post.course_id == course.id)
  //                    post.course_title = course.title
  //               });
  //           });

  //           setCourses(newCourses);
  //           setPosts(newPosts);
  //       })
  //   })
  // }

  let listTags = [];
  let addBtnTag = '';

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
