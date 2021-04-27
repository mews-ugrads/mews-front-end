
import React, { useState, useEffect } from "react";
import "../../../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header/Header";
import Feed from "../../components/Feed/Feed";
import NetworkGraph from "../../components/NetworkGraph/Ngraph";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
function Home() {
    const port = 5002
    const [postData, setPostData] = useState([]);
    const [amount, setAmount] = useState(5)
    const [CPostData, setCPostData] = useState([]);
    const [upperDate, setUpperDate] = useState()
    const [lowerDate, setLowerDate] = useState();
    const [CentPostData, setCentPostData] = useState([]);
    const [ClustPostData, setClustPostData] = useState([]);



    useEffect(() => {
        getCentralPosts();
        getClusteredPosts();
        getPosts();
    }, []);

    const getPosts = () => {
        axios.get(`http://dsg3.crc.nd.edu:${port}/posts/trending`, {
            params: {
                amount: amount,
                upper: upperDate,
                lower: lowerDate
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
            // console.log(allCPosts)
            console.log(CentPostData)

            //   console.log(response.data)
            //   console.log(CPostData);
        }).catch(error => console.error("error"));
    };

    const getClusteredPosts = () => {
        axios.get("http://dsg3.crc.nd.edu:5000/clusters/recent?amount=5").then((response) => {
            const allClustPosts = response.data;
            setClustPostData(allClustPosts);
            // console.log(allCPosts)
            // console.log(ClustPostData)

            /*    ClustPostData = {
                 nodes: ClustPostData.nodes,
                 links: ClustPostData.links,
                 focusedNodeId: {}};
     
                 //const {CPostData, ...data} = ClustPostData 
     
              //   console.log(response.data)
                 console.log(ClustPostData); */
        }).catch(error => console.error("error"));

        /*axios.get("http://dsg3.crc.nd.edu:5000/clusters/recent").then(response => {
         // console.log(response.data);
             filesystem.writeFile('response.json', response.data, function (err) {
                 console.log(err);
             });
         }).catch(err => {
             console.log(err)
         }); */
    };

    const handleChange = () => {
        console.log(document.getElementById("amount").value)
        setAmount(document.getElementById("amount").value)
    }
    const handleSubmit = (event) => {

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
            <NetworkGraph data={ClustPostData} />
            <h2 style={{
                textAlign: "left"
            }}>Network Graph</h2>




        </div >
    );

    /*             <NetworkGraph CPostData={CPostData} />

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
