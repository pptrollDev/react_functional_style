import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function DetailPost(){
    const [post, setPost] = useState({});
    const [courses, setCourses] = useState([]);
    const params = useParams();
    
    useEffect(function(){
        getPost();
        // console.log(params);
        
        
        return function(){
          
        }
      }, []);

      function getPost(){
          let newCourses = [];
          let newPost = {};
        fetch('http://localhost:7070/api/courses')
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            newCourses = json.courses; 
            setCourses(newCourses);
    
            fetch('http://localhost:7070/api/posts/'+params.postId)
            .then(function(response){
                return response.json();
            })
            .then(function(json){
                newPost = json.post;

                newCourses.forEach((course)=>{
                    if(course.id==newPost.course_id){
                        newPost.course_title = course.title 
                    }
                });

                setPost(json.post);
    
                // comments=json.post._.comments;
                // commentContainer.innerHTML = "";
                // for(let i=comments.length-1; i>=0; i--){
                //     commentContainer.innerHTML += "<div class='authorPanel'>"+comments[i].author+"</div><div class='contentPanel'>"
                //     +comments[i].body+"</div>";
                // }
            })
        })
    }

    function updatePost(is_resolved){
        let headers = {
            "Content-Type": "application/json",                                                                                                
            "Access-Control-Origin": "*"
         }
    
        let data = {
            "is_resolved": is_resolved
        }
        
        fetch("http://localhost:7070/api/posts/"+params.postId+'/is_resolved', {
        method: "PUT",
        headers: headers,
        body:  JSON.stringify(data)
        })
        .then(function(response){ 
            return response.json(); 
        })
        .then(function(json){ 
            let newPost = post;
            newPost.is_resolved = json.post.is_resolved
            setPost(prev => {
                return {...prev, ...newPost};
            });
            window.alert("변경 되었습니다");
        });
    }

    function handleChange(e){
        e.preventDefault();
        updatePost(e.target.value);
    }

    let optionTags = [];
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
            <div class="postContainer">
                <div class="panel">
                    <div class="title"><span>질문 해결 여부</span></div>
                    <div>
                        <select value={post.is_resolved} onChange={handleChange}>
                            {optionTags}
                        </select>
                    </div>
                </div>
                <div class="panel">
                    <div class="title"><span>제목</span></div>
                    <div><span id="titleSpan">{post.title}</span></div>
                </div>
                <div class="panel">
                <div class="title"><span>작성 시간</span></div>
                    <div><span id="createdSpan">{post.created_at}</span></div>
                </div>
                <div class="panel">
                    <div class="title"><span>작성자</span></div>
                    <div><span id="authorSpan">{post.author}</span></div>
                </div>
                <div class="panel">
                    <div class="title"><span>연관 강의</span></div>
                    <div><span id="courseSpan">{post.course_title}</span></div>
                </div>
                <div class="panel">
                    <div class="title"><span>본문</span></div>
                    <div><span id="contentSpan">{post.body}</span></div>
                </div> 
            </div>
        </div>
    )
}

export default DetailPost;