import React, { useState } from "react";
import { Graph } from 'react-d3-graph';
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Post from "../Post/Post"

function NetworkGraph(props) {
    let port = 5001;
    const [modalShow, setModalShow] = useState(false);
    const [postData, setPostData] = useState(false);
    const [relPosts, setRelPosts] = useState([]);
    /*   useEffect(() => {
           getRelatedG();
       }, []); */

    var data = props.data;

    const myConfig = require("./configT.config.js")

    const onClickNode = function (nodeId, node) {
        getRelatedG(nodeId);
        axios.get(`http://dsg3.crc.nd.edu:${port}/posts/${nodeId}`).then((response) => {
            //`http://dsg3.crc.nd.edu:${port}/clusters/6 for bounding boxes
            //`http://dsg3.crc.nd.edu:${port}/posts/${nodeId}`
            const allPosts = response.data;
            setPostData(allPosts);
        }).catch(error => console.error("error"));

        console.log(node.svg)
        showModal(node.svg);
    };

    const showModal = function (pic_url) {
        //getRelatedG(nodeId);
        console.log(pic_url)
        setModalShow(true)

        console.log("in modal")

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
            // Use the intrinsic size of image in CSS pixels for the canvas element
            let WRfactor = 750 / this.naturalWidth;
            let HRfactor = 750 / this.naturalHeight;

            canvas.width = this.naturalWidth * WRfactor;
            canvas.height = this.naturalHeight * HRfactor;

            console.log(postData.boxes)

            context.drawImage(this, 0, 0, this.naturalWidth * WRfactor, this.naturalHeight * HRfactor);//canvas.width, canvas.height);

            if (postData.boxes != null) {

                var len = (postData.boxes).length;
                for (var i = 0; i < len; i++) {
                    let array = postData.boxes[i]
                    console.log(array)
                    if (array != null) {
                        console.log("Array: " + array);
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
        console.log(postData.heatmap_url)
        if (document.getElementById("heatmap").style.display == "none") {
            document.getElementById("heatmap").style.display = "block";
        }
        else if (document.getElementById("heatmap").style.display = "block") {
            document.getElementById("heatmap").style.display = "none";
        }
    }

    const displayRelated = () => {
        if (document.getElementById("relatedFrag").style.display == "none") {
            document.getElementById("relatedFrag").style.display = "block";
        }
        else if (document.getElementById("relatedFrag").style.display == "block") {
            document.getElementById("relatedFrag").style.display = "none";
        }
    }

    const getRelatedG = (nodeId) => {
        axios.get(`http://dsg3.crc.nd.edu:${port}/posts/${nodeId}/related`).then((response) => {
            const allRelPosts = response.data;
            setRelPosts(allRelPosts)
            if (relPosts) {
                for (var member in relPosts) delete relPosts[member];
            }
            // console.log("ALL", allRelPosts)
            // console.log(allRelPosts.length)
            /*  for (let i = 0; i < allRelPosts.length; i++) {
                  //console.log(postData.id)
                  axios.get(`http://dsg3.crc.nd.edu:${port}/posts/${allRelPosts[i].id}`).then((res) => {
                      relPosts.push(res.data)
                      //console.log(`http://dsg3.crc.nd.edu:${port}/posts/${allRelPosts[i].id}`)
                      //console.log(relPosts)
                      // console.log("res", res.data)
                      // console.log("rel", relPosts)
                  }).catch(error => console.error("error"));
              }
              console.log(relPosts)
              //setRelPosts(relPosts)
              console.log(relPosts) */
        }).catch(error => console.error("error"));

    }

    return (
        <div>
            <Graph
                id="graph-id" // id is mandatory
                data={data}
                config={myConfig}
                //   onClickNode={() => setModalShow(true)}
                onClickNode={onClickNode}
            // onClickLink={onClickLink}
            // onMouseOverNode={onMouseOverNode}
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

                    <a href={postData.post_url} target="_blank">
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
