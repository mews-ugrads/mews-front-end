import React, { useState, useEffect } from "react";
import "../../../src/App.css";
import Header from "../../components/Header/Header";
import NetworkGraph from "../../components/NetworkGraph/Ngraph";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container"

import Button from "react-bootstrap/Button";

function Graph() {
    const port = 5001;

    const [amountClust, setAmountClust] = useState(4);
    const [ClustPostData, setClustPostData] = useState([]);
    const [graphDate, setGraphDate] = useState();

    useEffect(() => {
        getClusteredPosts();
    }, []);


    const getClusteredPosts = () => {
        axios.get(`http://dsg3.crc.nd.edu:${port}/clusters/daily`, {

            params: {
                amount: amountClust,
                day: graphDate,
            }
        }).then((response) => {
            const allClustPosts = response.data;
            setClustPostData(allClustPosts);
        }).catch(error => console.error("error"));

    };

    const handleChangeClust = () => {
        setAmountClust(document.getElementById("amountClust").value)
        getClusteredPosts();
    }
    const handleSubmitClust = (event) => {
        event.preventDefault();
        getClusteredPosts();
    }

    const handleDateChange = () => {

        const newDate = document.getElementById("graphDate").value
        setGraphDate(newDate)
    }

    return (
        <div className="Graph">
            <Header />
            <br></br>

            <div>
                <Container>
                    <Navbar style={{ marginBottom: "10px", textAlign: "center", left: "10%", width: "80%" }} bg="primary" variant="light" className="justify-content-between" expand="lg">
                        <Navbar.Brand style={{ fontSize: "30px", color: "white" }} href="/">Network Graph</Navbar.Brand>

                        <Form inline onSubmit={handleSubmitClust} style={{ display: "inline-block" }} className=" mr-sm-2">
                            <label style={{ color: "white" }} >
                                Amount
                            <select onChange={handleChangeClust} id="amountClust" style={{ display: "inline-block" }}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="6">6</option>
                                    <option value="8">8</option>
                                    <option value="10">10</option>
                                </select>
                            </label>

                            <label style={{ color: "white" }}> Date
                            <input type="date" onChange={handleDateChange} id="graphDate" style={{ display: "inline-block" }}></input>

                            </label>
                            <Button type="submit" variant="success" size="sm" style={{ display: "inline-block", marginTop: "10px" }}>Submit</Button>
                        </Form>
                    </Navbar>
                </Container>
            </div>
            <div>
                <div className="containerGraph" style={{ backgroundColor: "white", border: "3px solid #363431" }} >
                    <NetworkGraph data={ClustPostData} id="graph" />

                </div>
            </div>
        </div >
    );
}

export default Graph;