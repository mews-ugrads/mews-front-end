
import React, { useState, useEffect } from "react";
import "../../../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//import "../Graph/node_modules/bootstrap/dist/css/bootstrap.min.css";
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
    const [postData, setPostData] = useState([]);
    const [upperDate, setUpperDate] = useState()
    const [lowerDate, setLowerDate] = useState();

    useEffect(() => {
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

    const handleChangeT = () => {
        console.log(document.getElementById("amountT").value)
        setAmountT(document.getElementById("amountT").value)
    }

    const handleSubmitT = (event) => {
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

    return (
        <div className="Home">
            <Header />
            <br></br>
            <Container>
                <Navbar style={{ position: "absolute", left: "11%", width: "78%" }} bg="light" variant="light" className="justify-content-between">
                    <Navbar.Brand style={{ fontSize: "30px" }} href="/">Trending Posts</Navbar.Brand>
                    <Form inline onSubmit={handleSearchSubmit}>
                        <Form.Group controlId="search">
                            <Form.Control style={{

                            }} type="text" placeholder="Search" id="searchValue" onChange={handleSearch} className="mr-sm-2" />
                        </Form.Group>

                        <Button variant="outline-success" type="submit" size="sm">
                            Search
                        </Button>
                    </Form >
                    <Form onSubmit={handleSubmitT}>
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
                    </Form>

                </Navbar>
                <Feed postData={postData}
                />
            </Container>







        </div >
    );

}

export default Home;

