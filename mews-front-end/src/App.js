//import logo from './logo.svg';
import './App.css';
//import Header from "./components/Header/Header";
//import React, { Component } from "react";
//import "./layouts/Graph/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Graph from "./layouts/Graph/Graph";
import Home from "./layouts/Home/Home";
//import * as d3 from 'd3';




function App() {
  return (
    <Router>

      <div className="App" style={{ backgroundColor: " #dedfe0" }}>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/graph" exact component={Graph}></Route>
        </Switch>
      </div >
    </Router >


  );
}

export default App;
