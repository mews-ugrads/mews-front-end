
import React, { Component } from "react";
import "../../../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header/Header";

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Header />
                <p>reverse</p>
            </div>
        );
    }
}
export default Home;
