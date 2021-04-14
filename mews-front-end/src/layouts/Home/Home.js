
import React, { Component } from "react";
import "../../../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header/Header";
import Feed from "../../components/Feed/Feed";

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Header />
                <h2 style={{
                    textAlign: "left"
                }}> Trending Posts</h2 >
                <Feed />
                <h2 style={{
                    textAlign: "left"
                }}> Relatedness Posts</h2 >
                <h2 style={{
                    textAlign: "left"
                }}> Trending Words</h2 >

                <NetworkGraph />
                <div id="my_dataviz"></div>

            </div>
        );
    }
}
export default Home;
