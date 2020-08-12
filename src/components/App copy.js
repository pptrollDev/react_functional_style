import React, {useState, useEffect} from 'react';
import List from './List';
import DetailPost from './DetailPost';
import AddPost from './AddPost';

function App() {
  const [componentState, setComponentState] = useState([]);
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [options, setOptions] = useState({
    count: 0,
    current_page: 1,
    records_per_page: 10,
    searchStr: '',
    is_resolved: ''
  });

  useEffect(function(){
    getPosts();
    
    return function(){
      
    }
  }, []);

  function getPosts(){
    let newCourses = [];
    let newPosts = [];

    fetch('http://localhost:7070/api/courses')
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        newCourses = json.courses;

        fetch('http://localhost:7070/api/posts?is_resolved='+options.is_resolved+'&page='+options.current_page+'&s='+options.searchStr)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            newPosts = json.posts;

            if(options.searchStr || options.is_resolved!='')
              options.count = 1;
            else
              options.count = json.count;

            setOptions(options);
            
            newPosts.forEach((post)=>{
                newCourses.forEach((course)=>{
                    if(post.course_id == course.id)
                     post.course_title = course.title
                });
            });

            setCourses(newCourses);
            setPosts(newPosts);
            setComponentState({ListPost:true});
        })
    })
}

function handleSubmit(title, author, course, content){
  if(!title || !author || !course || !content){
      window.alert("모든 입력값은 필수값 입니다.");
  }
  else if(author.length<3){
      window.alert("작성자를 3자이상 입력해주세요.");
  }
  else if(content.length<10){
      window.alert("본문을 10자이상 입력해주세요");
  }else{
      var headers = {
          "Content-Type": "application/json",                                                                                                
          "Access-Control-Origin": "*"
       }
  
      var data = {
          "author": author,
          "title": title,
          "body": content,
          "course_id": course
      }
      
      fetch("http://localhost:7070/api/posts", {
      method: "POST",
      headers: headers,
      body:  JSON.stringify(data)
      })
      .then(function(response){ 
          return response.json(); 
      })
      .then(function(data){ 
          if(window.confirm("등록 되었습니다")){
              getPosts();
          }else{
              getPosts();
          };
      });
  }
}

function handleOnClickAdd(){
  setComponentState({AddPost:true});
}

function handleOnClickTitle(postId){
  fetch('http://localhost:7070/api/posts/'+postId)
  .then(function(response){
      return response.json();
  })
  .then(function(json){
      setPost(json.post);
      setComponentState({DetailPost:true});
  });
}

  return (
    <div className="App">
      {componentState.ListPost?
      <List posts={posts} onClickAdd={handleOnClickAdd} onClickTitle={handleOnClickTitle}></List>
      :''}
      {componentState.AddPost?
      <AddPost courses={courses} handleSubmit={handleSubmit}></AddPost>
      :''}
      {componentState.DetailPost?
      <DetailPost post={post}></DetailPost>
      :''}
    </div>
  );
}

export default App;
