
import React, { useState, useEffect } from "react";
import "../../../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header/Header";
import Feed from "../../components/Feed/Feed";
import NetworkGraph from "../../components/NetworkGraph/Ngraph";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/esm/Button";
function Home() {

    const [amount, setAmount] = useState(5)
    const [CPostData, setCPostData] = useState([]);
    const [lowerDate, setLowerDate] = useState()

    const [postData, setPostData] = useState([]);

    useEffect(() => {
        getCentralPosts();
        getPosts();
    }, []);
    // let amountPosts = 5
    // amountPosts = document.getElementById("amount").value
    const getPosts = () => {
        axios.get("http://dsg3.crc.nd.edu:5000/posts/trending", {
            params: {
                amount: amount,
                // lower: 2021 - 01 - 01T14: 51: 06.157Z
                //upper: new Date()
                lower: d
            }
        }).then((response) => {
            const allPosts = response.data;
            setPostData(allPosts);
        }).catch(error => console.error("error"));
    };
    console.log(amount)

    const getCentralPosts = () => {
        axios.get("http://dsg3.crc.nd.edu:5000/graph/central").then((response) => {
            const allCPosts = response.data;
            setCPostData(allCPosts);
            console.log(CPostData);
        }).catch(error => console.error("error"));
    };

    const handleChange = () => {
        console.log(document.getElementById("amount").value)
        setAmount(document.getElementById("amount").value)
    }
    const handleSubmit = (event) => {
        //location.reload()
        //x event.preventDefault();
        event.preventDefault();
        getPosts();
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
            <form onSubmit={handleSubmit}>
                <label>
                    Amount
                    <select onChange={handleChange} id="amount">
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
            <NetworkGraph CPostData={CPostData} />
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
