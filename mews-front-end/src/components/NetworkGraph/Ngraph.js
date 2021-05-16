import React, { useEffect, useState, ReactDOM } from "react";
import { Graph } from 'react-d3-graph';
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Post from "../Post/Post"

function NetworkGraph(props) {
    let port = 5000;
    const [modalShow, setModalShow] = useState(false);
    const [postData, setPostData] = useState(false);
    const [relPosts, setRelPosts] = useState([]);


    var data = props.data;


    const myConfig = require("./configT.config.js")

    const onClickNode = function (nodeId, node) {
        getRelatedG(nodeId);
        axios.get(`http://dsg3.crc.nd.edu:${port}/posts/${nodeId}`).then((response) => {
            const allPosts = response.data;
            setPostData(allPosts);
        }).catch(error => console.error("error"));

        showModal(node.svg);
    };

    const showModal = function (pic_url) {
        setModalShow(true)

        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");
        const img = new Image(); // Using optional size for image
        img.onload = drawImageAS; // Draw when image has loaded
        img.src = pic_url;

        function drawImageAS() {
            // Use the intrinsic size of image in CSS pixels for the canvas element
            let WRfactor = 750 / this.naturalWidth;
            let HRfactor = 750 / this.naturalHeight;

            canvas.width = this.naturalWidth * WRfactor;
            canvas.height = this.naturalHeight * HRfactor;

            context.drawImage(this, 0, 0, this.naturalWidth * WRfactor, this.naturalHeight * HRfactor);
        };


    };

    const showBoxes = function () {
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");

        const img = new Image(0, 0); // Using optional size for image
        img.onload = drawImageActualSize; // Draw when image has loaded
        img.src = postData.image_url;

        function drawImageActualSize() {
            let WRfactor = 750 / this.naturalWidth;
            let HRfactor = 750 / this.naturalHeight;

            canvas.width = this.naturalWidth * WRfactor;
            canvas.height = this.naturalHeight * HRfactor;

            context.drawImage(this, 0, 0, this.naturalWidth * WRfactor, this.naturalHeight * HRfactor);

            if (postData.boxes != null) {

                var len = (postData.boxes).length;
                for (var i = 0; i < len; i++) {
                    let array = postData.boxes[i]
                    if (array != null) {
                        let arrayN = JSON.parse("[" + array + "]");
                        let lenN = arrayN.length;
                        for (var j = 0; j < lenN; j++) {
                            context.strokeStyle = 'red';
                            context.lineWidth = 7;
                            context.strokeRect(arrayN[j][0] * WRfactor, arrayN[j][1] * HRfactor, (arrayN[j][2] - arrayN[j][0]) * WRfactor, (arrayN[j][3] - arrayN[j][1]) * HRfactor);


                        }
                    }

                }

            }

        }
    };


    const displayHeatmap = () => {
        if (document.getElementById("heatmap").style.display == "none") {
            document.getElementById("heatmap").style.display = "block";
        }
        else if (document.getElementById("heatmap").style.display = "block") {
            document.getElementById("heatmap").style.display = "none";
        }
    }

    const displayRelated = () => {
        document.getElementById("relatedFrag").style.display = "block";
    }


    const getRelatedG = (nodeId) => {

        axios.get(`http://dsg3.crc.nd.edu:${port}/posts/${nodeId}/related`).then((response) => {
            const allRelPosts = response.data;
            setRelPosts(allRelPosts)
            if (relPosts) {
                for (var member in relPosts) delete relPosts[member];
            }

        }).catch(error => console.error("error"));
        
    }


    return (
        <div>

            <Graph
                id="graph-id" 
                data={data}
                config={myConfig}
                onClickNode={onClickNode}
            />

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                animation={false}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p>Click on image to be taken to post.</p>
                        <p><b>{postData.when_posted}</b></p>
                    </div>

                    <a href={postData.post_url}>
                        <canvas width="0" height="0" id="canvas"></canvas>
                    </a>
                    <div style={{ display: "inline-block" }}>
                        <Button variant="primary" onClick={showBoxes} style={{ marginRight: "20px" }} /*setModalShow(true) onClick={showModal}*/>
                            Display Subimages </Button>

                        <Button variant="primary" onClick={displayHeatmap} style={{ marginTop: "20px", marginBottom: "20px" }} >Display Heatmap</Button>
                    </div>
                    <img id="heatmap" src={postData.heatmap_url} style={{ display: "none" }} width="750" height="750" />

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p><b style={{ fontSize: "40px" }}>{postData.replies}</b> Replies</p>
                        <p><b style={{ fontSize: "40px" }}>{postData.reposts}</b> Reposts</p>
                        <p><b style={{ fontSize: "40px" }}>{postData.likes}</b> Likes</p>
                    </div>

                    <p><b>Caption:</b> {postData.related_text}</p>
                    <h3>Related Posts</h3>
                    <Button variant="primary" onClick={displayRelated} >Display Related Posts</Button>
                    <div style={{ display: "none" }} id="relatedFrag">
                        <React.Fragment>
                            {relPosts.map((post) => {
                                return (
                                    <div>
                                        <Post post={post} > </Post>
                                    </div>
                                );
                            })
                            }
                        </React.Fragment>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>



        </div>
    );

}

export default NetworkGraph;
