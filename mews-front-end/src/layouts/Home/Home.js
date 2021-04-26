
import React, { useState, useEffect } from "react";
import "../../../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header/Header";
import Feed from "../../components/Feed/Feed";
import NetworkGraph from "../../components/NetworkGraph/Ngraph";
import axios from "axios";
const filesystem = require('fs');

function Home() {
    const [CentPostData, setCentPostData] = useState([]);
    const [ClustPostData, setClustPostData] = useState([]);
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        getCentralPosts();
        getClusteredPosts();
        getPosts();

        // console.log("useEffect");
    }, []);

    const getPosts = () => {
        axios.get("http://dsg3.crc.nd.edu:5000/posts/trending?amount=7").then((response) => {
            const allPosts = response.data;
            setPostData(allPosts);
           // console.log(postData)
        }).catch(error => console.error("error"));
    };

    const getCentralPosts = () => {
        axios.get("http://dsg3.crc.nd.edu:5000/graph/central").then((response) => {
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




    return (
        <div className="Home">
            <Header />
            <h2 style={{
                textAlign: "left"
            }}> Trending Posts</h2 >
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


        </div>
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
