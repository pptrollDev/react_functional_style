import React, {useState, useEffect} from 'react';
import './AddPost.css';

function AddPost(){
    const [courses, setCourses] = useState([]);
    const [forms, setForms] = useState({
        title: '',
        author: '',
        course: '',
        content: ''
    });

    useEffect(function(){
        getCourses();
        
        return function(){
          
        }
      }, []);

    function getCourses(){
        fetch('http://localhost:7070/api/courses')
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            if(json.courses.length>0){
                let newForms = forms;
                newForms.course = json.courses[0].id;

                setForms(prev => {
                    return {...prev, ...newForms};
                });
            }

            setCourses(json.courses);
        });
    }

    function createCourse(){
        var headers = {
            "Content-Type": "application/json",                                                                                                
            "Access-Control-Origin": "*"
         }
    
        var data = {
            "author": forms.author,
            "title": forms.title,
            "body": forms.content,
            "course_id": forms.course
        }
        
        fetch("http://localhost:7070/api/posts", {
        method: "POST",
        headers: headers,
        body:  JSON.stringify(data)
        })
        .then(function(response){ 
            return response.json(); 
        })
        .then(function(json){ 
            if(window.confirm("등록 되었습니다")){
                window.location = '/';
            }else{
                window.location = '/';
            };
        });
    }

    function handleChange(e) {
        let newForms = forms;
        newForms[e.target.name] = e.target.value

        setForms(prev => {
            return {...prev, ...newForms};
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        // props.handleSubmit(state.title, state.author, state.course, state.content);
        if(!forms.title || !forms.author || !forms.course || !forms.content){
            window.alert("모든 입력값은 필수값 입니다.");
        }
        else if(forms.author.length<3){
            window.alert("작성자를 3자이상 입력해주세요.");
        }
        else if(forms.content.length<10){
            window.alert("본문을 10자이상 입력해주세요");
        }else{
            createCourse();
        }
    }

    let optionTags = [];
    courses.forEach((course)=>{
        optionTags.push(
            <option key={course.id} value={course.id}>{course.title}</option>       
        );
    });

    return (
        <div>
            <div>
                <h2>추가</h2>
            </div>   
            <form id="addPostForm">
                <div className="addPostContainer">
                    <div className="panel">
                        <div className="title"><span>제목</span></div>
                        <div><input type="text" name='title' value={forms.title} onChange={handleChange} /></div>
                    </div>
                    <div className="panel">
                        <div className="title"><span>작성자</span></div>
                        <div><input type="text" name='author' value={forms.author} onChange={handleChange} /></div>
                    </div>
                    <div className="panel">
                        <div className="title"><span>강의 목록</span></div>
                        <div><select name="course" onChange={handleChange}>{optionTags}</select></div>
                    </div>
                    <div className="panel">
                        <div className="title"><span>본문</span></div>
                        <div><textarea type="text" name='content' value={forms.content} onChange={handleChange} /></div>
                    </div> 
                    <div className="btnPanel">
                        <button type="submit" onClick={handleSubmit}>확인</button>
                    </div> 
                </div>
            </form>         
        </div>
    )
}

export default AddPost;