
import React, { useState, useEffect } from "react";
import "../../../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header/Header";
import Feed from "../../components/Feed/Feed";
import NetworkGraph from "../../components/NetworkGraph/Ngraph";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/esm/Button";
const filesystem = require('fs');
function Home() {

    const [amountT, setAmountT] = useState(5);
    const [amountClust, setAmountClust] = useState(1);
    const [lowerDate, setLowerDate] = useState();
    const [CentPostData, setCentPostData] = useState([]);
    const [ClustPostData, setClustPostData] = useState([]);


    const [postData, setPostData] = useState([]);

    useEffect(() => {
        getCentralPosts();
        getClusteredPosts();
        getPosts();
    }, []);
    // let amountPosts = 5
    // amountPosts = document.getElementById("amount").value
    const getPosts = () => {
        axios.get("http://dsg3.crc.nd.edu:5000/posts/trending", {
            params: {
                amount: amountT,
                // lower: 2021 - 01 - 01T14: 51: 06.157Z
                //upper: new Date()
                lower: d
            }
        }).then((response) => {
            const allPosts = response.data;
            setPostData(allPosts);
        }).catch(error => console.error("error"));
    };
    console.log(amountT)

    const getCentralPosts = () => {
        axios.get("http://dsg3.crc.nd.edu:5000/graph/central").then((response) => {
            const allCentPosts = response.data;
            setCentPostData(allCentPosts);
           // console.log(allCPosts)
           // console.log(CentPostData)
        }).catch(error => console.error("error"));
    };

    const getClusteredPosts = () => {
        axios.get("http://dsg3.crc.nd.edu:5000/clusters/recent", {
             params: {
                amount: amountClust,
             }
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
        //getClusteredPosts();
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
        getClusteredPosts();
    }
    const handleDChange = () => {
        console.log(document.getElementById("date").value)
        setLowerDate(new Date().toLocaleString())
    }

    let d = new Date()
    d.setDate(d.getDate() - 5);
    console.log(d.toLocaleString());
    //  setLowerDate(d)

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
                    <input type="datetime-local" onChange={handleDChange} id="date"></input>
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

    /*
        <h2 style={{
                textAlign: "left"
            }}> Relatedness Posts</h2 >
            <h2 style={{
                textAlign: "left"
            }}> Trending Words</h2 >
    */

    /* return (
                    <p>ID: {postData.id}</p>
            <p>Image url: {postData.image_url}</p>
            <img alt="" src={postData.image_url} />
            <p>Post url: {postData.post_url}</p>
            <p>Replies: {postData.replies}</p>
            <p>Reposts: {postData.reposts}</p>
            <p>User id: {postData.user_id}</p>
            <p>When posted: {postData.when_posted}</p>

         < div className="Home" >
             <h2 style={{
                 textAlign: "left"
             }}> Trending Posts</h2 >
             <h2 style={{
                 textAlign: "left"
             }}> Relatedness Posts</h2 >
             <h2 style={{
                 textAlign: "left"
             }}> Trending Words</h2 >
             <h2>{postData.id}</h2>
 
         </div >
     );*/
}

export default Home;
