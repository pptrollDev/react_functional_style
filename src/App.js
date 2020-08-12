import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink, useParams} from 'react-router-dom';
import ListPost from './ListPost';
import DetailPost from './DetailPost';
import AddPost from './AddPost';

function App() {


  return (
    <div className="App">
      <Switch>
        <Route exact path="/"><ListPost/></Route>
        <Route path="/addpost"><AddPost/></Route>
        <Route path="/detailpost/:postId"><DetailPost/></Route>
        <Route path="/">Not found</Route>
      </Switch>
    </div>
  );
}

export default App;
