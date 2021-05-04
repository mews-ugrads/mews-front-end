
import React, { useState, useEffect } from "react";
import "../../../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header/Header";
import Feed from "../../components/Feed/Feed";
import NetworkGraph from "../../components/NetworkGraph/Ngraph";
import axios from "axios";

import Button from "react-bootstrap/esm/Button";
const filesystem = require('fs');
function Home() {

    const [amountT, setAmountT] = useState(5);
    const [amountClust, setAmountClust] = useState(1);
    const port = 5000;
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
        //location.reload()
        //x event.preventDefault();
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


    return (
        <div className="Home">
            <Header />
            <h2 style={{
                textAlign: "left"
            }}> Trending Posts</h2 >
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
                <Button type="submit" variant="secondary" size="sm">Submit</Button>
            </form>
            <Feed postData={postData}
            />
            <br>
            </br>
            <h2 style={{
                textAlign: "left"
            }}> Central Posts</h2 >
            
            <form onSubmit={handleSubmitClust}>
                <label>
                    Amount
                    <select onChange={handleChangeClust} id="amountClust">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                    </select>
                </label>
                <Button type="submit" variant="secondary" size="sm">Submit</Button>
            </form>
            <NetworkGraph data={ClustPostData} /> 

            <h2 style={{
                textAlign: "left"
            }}>Network Graph</h2> 




        </div >
    );

}

export default Home;

/*
<form onSubmit={handleSubmitClust}>
                <label>
                    Amount
                    <select onChange={handleChangeClust} id="amountClust">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                    </select>
                </label>
                <Button type="submit" variant="secondary" size="sm">Submit</Button>
            </form>
            <NetworkGraph data={ClustPostData} /> 

            <h2 style={{
                textAlign: "left"
            }}>Network Graph</h2> 
*/
