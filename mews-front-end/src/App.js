//import logo from './logo.svg';
import './App.css';
//import Header from "./components/Header/Header";
//import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Reverse from "./layouts/Reverse/Reverse";
import Home from "./layouts/Home/Home";
import * as d3 from d3;




function App() {
  return (
    <Router>

      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/reverse" exact component={Reverse}></Route>
        </Switch>
      </div >
    </Router>


  );
}

export default App;
