
import React, { useState, useEffect } from "react";
import "../../../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header/Header";
import Feed from "../../components/Feed/Feed";
import axios from "axios";


function Home() {
    const [postData, setPostData] = useState([]
    );

    useEffect(() => {
        getGiHubUserWithAxios();


        console.log("useEffect");
    }, []);

    async function getGiHubUserWithAxios() {
        //const response = await axios.get("http://127.0.0.1:5000/posts/trending");

        /*   const response = await axios.get("http://dsg3.crc.nd.edu:5000/posts/trending").then((res) => {
               console.log(response.data)
               setPostData(response.data.Data.Results)
               console.log(postData)
   
           })*/
        const response = await axios.get("http://dsg3.crc.nd.edu:5000/posts/trending")
        console.log(response.data)
        setPostData(response.data)
        // console.log(postData)
        //  setPostData([...postData, response.data]);



    };



    return (
        <div className="Home">
            <Header />
            <h2 style={{
                textAlign: "left"
            }}> Trending Posts</h2 >
            <Feed
            />
            <h2 style={{
                textAlign: "left"
            }}> Relatedness Posts</h2 >
            <h2 style={{
                textAlign: "left"
            }}> Trending Words</h2 >
            <p>{postData.id}</p>

        </div>
    );

    /* return (
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
