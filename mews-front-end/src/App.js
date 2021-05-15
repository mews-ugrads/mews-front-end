import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Graph from "./layouts/Graph/Graph";
import Home from "./layouts/Home/Home";

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
