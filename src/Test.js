import React, {useState, useEffect} from 'react';

function Test(){
    const [val, setVal] = useState('');
    const list = ['a', 'ab', 'abcd', 'abc', 'abcde'];

    useEffect(function(){
        
        return function(){
          
        }
      }, []);

    function handleChange(e) {
        setVal(e.target.value);
    }

    let liTags = [];

    list.filter(v => v.includes(val))
    .sort((a, b)=> {
        if(a < b)
            return -1;
        if(a > b)
            return 1;
        return 0;
    })
    .forEach((v)=>{
        liTags.push(
            <li key={v}>{v}</li>
        )
    });

    return (
        <div>
            <h2>Test</h2>
            <input onChange={handleChange}></input>  
            <ol>{liTags}</ol>
        </div>
    )
}

export default Test;