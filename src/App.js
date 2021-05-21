import React from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';
import Home from "./components/Home";
import CourseStructure from "./components/CourseStructure";

function App() {
  return (
    <div className="App">
      <Router>
       <Route exact path="/" component={Home} />
       <Route path="/:coursename" component={CourseStructure} />
      </Router>
    </div>
  );
}

export default App;
