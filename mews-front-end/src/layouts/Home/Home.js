
import React, { useState, useEffect } from "react";
import "../../../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header/Header";
import Feed from "../../components/Feed/Feed";
import NetworkGraph from "../../components/NetworkGraph/Ngraph";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container"

import Button from "react-bootstrap/Button";
const filesystem = require('fs');
function Home() {
    const port = 5000;
    const [newSearch, setNewSearch] = useState();

    const [amountT, setAmountT] = useState(8);
    const [amountClust, setAmountClust] = useState(1);



    const [postData, setPostData] = useState([]);
    const [upperDate, setUpperDate] = useState()
    const [lowerDate, setLowerDate] = useState();
    const [CentPostData, setCentPostData] = useState([]);
    const [ClustPostData, setClustPostData] = useState([]);



    useEffect(() => {
        //getCentralPosts();
        getClusteredPosts();
        getPosts()
    }, []);

    const getPosts = () => {
        axios.get(`http://dsg3.crc.nd.edu:${port}/posts/trending`, {
            params: {
                amount: amountT,
                upper: upperDate,
                lower: lowerDate,
                getBoxes: true,
                search: newSearch
            }
        }).then((response) => {
            const allPosts = response.data;
            setPostData(allPosts);
        }).catch(error => console.error("error"));
    };

    const getCentralPosts = () => {
        axios.get(`http://dsg3.crc.nd.edu:${port}/graph/central`).then((response) => {
            const allCentPosts = response.data;
            setCentPostData(allCentPosts);

        }).catch(error => console.error("error"));
    };

    const getClusteredPosts = () => {
        console.log("in get clustered")
        axios.get(`http://dsg3.crc.nd.edu:${port}/clusters/6`, { //recent
            /* params: {
                amount: amountClust,
             }*/

            //   axios.get(`http://dsg3.crc.nd.edu:${port}/clusters/recent`, {
        }).then((response) => {
            const allClustPosts = response.data;
            setClustPostData(allClustPosts);

        }).catch(error => console.error("error"));

    };
    console.log(amountClust)

    const handleChangeClust = () => {
        console.log("in handle Clust")
        console.log(document.getElementById("amountClust").value)
        setAmountClust(document.getElementById("amountClust").value)
        getClusteredPosts();
    }
    const handleSubmitClust = (event) => {
        console.log("in submitClust")
        event.preventDefault();
        getClusteredPosts();
    }

    const handleChangeT = () => {
        console.log(document.getElementById("amountT").value)
        setAmountT(document.getElementById("amountT").value)
    }

    const handleSubmitT = (event) => {
        //event.preventDefault();
        console.log("in submitT")

        event.preventDefault();
        getPosts();
    }
    const handleLDChange = () => {
        console.log(document.getElementById("Ldate").value)
        const newLDate = document.getElementById("Ldate").value
        setLowerDate(newLDate)


    }
    const handleUDChange = () => {

        console.log(document.getElementById("Udate").value)
        const newUDate = document.getElementById("Udate").value
        setUpperDate(newUDate)

    }

    const handleClustDChange = () => {
        console.log("iin customee fate chagfe")
    }

    const handleSearchSubmit = (event) => {
        console.log("in search submit")

        event.preventDefault();

        getPosts();
        console.log("done")
    }

    const handleSearch = () => {
        console.log(document.getElementById("searchValue").value)
        const newSearch = document.getElementById("searchValue").value
        setNewSearch(newSearch)
    }
    /*
    const ClustPostData = {
        id: "graph",
        data: ClustPostData,
        config: this.state.config,
        onClickNode: this.onClickNode,
        onDoubleClickNode: this.onDoubleClickNode,
        onRightClickNode: this.onRightClickNode,
        onClickGraph: this.onClickGraph,
        onClickLink: this.onClickLink,
        onRightClickLink: this.onRightClickLink,
        onMouseOverNode: this.onMouseOverNode,
        onMouseOutNode: this.onMouseOutNode,
        onMouseOverLink: this.onMouseOverLink,
        onMouseOutLink: this.onMouseOutLink,
        onNodePositionChange: this.onNodePositionChange,
        onZoomChange: this.onZoomChange,
      };
      
    const onZoomChange = (prevZoom, newZoom) => {
        this.setState({ currentZoom: newZoom });
      };
    */

    return (
        <div className="Home">
            <Header />
            <br></br>
            <Container>
                <Navbar style={{ backgroundColor: "white" }} bg="light" variant="light" className="navbar">
                    <Navbar.Brand style={{ fontSize: "30px" }} href="/">Trending Posts</Navbar.Brand>
                    <Form inline onSubmit={handleSearchSubmit}>
                        <Form.Group controlId="search">
                            <Form.Control style={{

                            }} type="text" placeholder="Search" id="searchValue" onChange={handleSearch} className="mr-sm-2" />

                        </Form.Group>


                        <Button variant="outline-success" type="submit">
                            Search
  </Button>
                    </Form >
                    <form onSubmit={handleSubmitT}>
                        <label>
                            Amount
                    <select onChange={handleChangeT} id="amountT">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="30">35</option>
                                <option value="40">40</option>
                                <option value="45">45</option>
                                <option value="50">50</option>
                            </select>
                        </label>
                        <label> Date Range
                <input type="datetime-local" onChange={handleLDChange} id="Ldate"></input>
                            <input type="datetime-local" onChange={handleUDChange} id="Udate"></input>

                        </label>
                        <Button type="submit" variant="outline-success" size="sm">Submit</Button>
                    </form>

                </Navbar>
                <Feed postData={postData}
                />
            </Container>




            <br>
            </br>
            <h2 style={{
                textAlign: "center"
            }}> Network Graph</h2 >

            <Navbar style={{ backgroundColor: "white", textAlign:"center", position:"absolute", left: "33%"}} bg="light" variant="light" className="navbar2"> 
                    <Navbar.Brand style={{ fontSize: "30px" ,textAlign:"center" }} href="/"></Navbar.Brand>
                    
                    <form onSubmit={handleSubmitClust} style={{display:"inline-block"}}>
                        <label>
                            Amount
                            <select onChange={handleChangeClust} id="amountClust" style={{display:"inline-block"}}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="6">6</option>
                                <option value="8">8</option>
                                <option value="10">10</option>
                            </select>
                        </label>
                        <label> Date
                            <input type="datetime-local" onChange={handleClustDChange} id="ClustDate" style={{display:"inline-block"}}></input>
                        </label>
                        <Button type="submit" variant="outline-success" size="sm" style={{display:"inline-block"}}>Submit</Button>
                    
                    </form>
                </Navbar>

            <div className = "containerGraph"  style={{border: '10px solid black'}}>
                <NetworkGraph data={ClustPostData} id="graph"/>
            </div>




        </div >
    );

}

export default Home;

