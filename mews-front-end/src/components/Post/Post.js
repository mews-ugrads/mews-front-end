import React, { useEffect, useState, ReactDOM } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//import MyModal from "../MyModal/MyModal";
import Modal from "react-bootstrap/Modal";
import { Image as BImage } from "react-bootstrap/Image";
import axios from "axios";
//import Feed from "../Feed/Feed";


function Post(props) {
    const port = 5000;
    const [modalShow, setModalShow] = useState(false);
    const [relPosts, setRelPosts] = useState([]);

    let { image_url, post_url, when_posted, likes, reposts, replies, id, related_text, ocr_text, boxes, heatmap_url } = props.post;

    useEffect(() => {
        getRelated();
    }, []);

    const getRelated = () => {
        axios.get(`http://dsg3.crc.nd.edu:${port}/posts/${id}/related`).then((response) => {
            const allRelPosts = response.data;
            console.log("relposts")

            console.log("ALL", allRelPosts)
            // console.log(allRelPosts.length)
            for (let i = 0; i < allRelPosts.length; i++) {
                console.log(id)
                axios.get(`http://dsg3.crc.nd.edu:${port}/posts/${allRelPosts[i].id}`).then((res) => {
                    relPosts.push(res.data)
                    // console.log("res", res.data)
                    // console.log("rel", relPosts)
                }).catch(error => console.error("error"));
            }
        }).catch(error => console.error("error"));
    }

    const showModal = function () {
        setModalShow(true)
        // if(boxes.length < 1){
        //     document.getElementById('img').style.visibility = 'none';
        // }
        // let canvas = document.getElementById("canvas");
        //let canvas = document.getElementById("canvas");

        // if(canvas != null) {canvas.onload = drawCanv(canvas); } 

    };

    const showBoxes = function () {
        if (boxes.length > 0) {
            document.getElementById('my_image').style.display = 'none';
            console.log(boxes)
            console.log("in showBoxes")
            let canvas = document.getElementById("canvas");

            let context = canvas.getContext("2d");

            const img = new Image(60, 45); // Using optional size for image
            img.onload = drawImageActualSize; // Draw when image has loaded
            img.src = image_url;

            function drawImageActualSize() {
                // Use the intrinsic size of image in CSS pixels for the canvas element
                let WRfactor = 750 / this.naturalWidth;
                let HRfactor = 750 / this.naturalHeight;

                canvas.width = this.naturalWidth * WRfactor;
                canvas.height = this.naturalHeight * HRfactor;

                console.log(boxes)

                context.drawImage(this, 0, 0, this.naturalWidth * WRfactor, this.naturalHeight * HRfactor);//canvas.width, canvas.height);

                if (boxes != null) {

                    var len = (boxes).length;
                    for (var i = 0; i < len; i++) {
                        console.log("drawing boxes");
                        let array = boxes[i]
                        console.log(array)
                        if (array != null) {
                            let arrayN = JSON.parse("[" + array + "]");
                            let lenN = arrayN.length;
                            for (var j = 0; j < lenN; j++) {
                                context.strokeStyle = 'red';
                                context.lineWidth = 7;
                                context.strokeRect(arrayN[j][0] * WRfactor, arrayN[j][1] * HRfactor, (arrayN[j][2] * WRfactor - arrayN[j][0] * WRfactor), (arrayN[j][3] * HRfactor - arrayN[j][1] * HRfactor));

                                console.log("drawing boxesN");

                            }
                        }

                    }

                }

            };

        }
    };






    const displayHeatmap = () => {
        console.log("func")
        document.getElementById("heatmap").style.display = "block";
    }
    /* const showModal = () => {
         
     }*/

    return (


        <div>
            <Card style={{
                width: '16rem', margin: "10px"
            }}>
                <a href={post_url}>
                    <Card.Img variant="top" src={image_url} style={{
                        height: "18vw", width: "100%",
                        objectFit: "cover"
                    }} />
                </a>
                <Card.Body>

                    <Button variant="primary" onClick={showModal}>
                        View </Button>

                    <Modal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        animation={false}
                        {...props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton >
                        </Modal.Header>
                        <Modal.Body>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>Click on image to be taken to post. {id}</p>
                                <p><b>{when_posted}</b></p>
                            </div>
                            <a href={post_url}>
                                <img src={image_url} id="my_image" width="750" height="750" /></a>
                            <canvas width="0" height="0" id="canvas" ></canvas>


                            <Button variant="primary" onClick={displayHeatmap} style={{ marginTop: "20px", marginBottom: "20px" }} >Display Heatmap</Button>

                            <img id="heatmap" src={heatmap_url} style={{ display: "none" }} width="750" height="750" />

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p><b style={{ fontSize: "40px" }}>{replies}</b> Replies</p>
                                <p><b style={{ fontSize: "40px" }}>{reposts}</b> Reposts</p>
                                <p><b style={{ fontSize: "40px" }}>{likes}</b> Likes</p>
                            </div>

                            <p><b>Caption:</b> {related_text}</p>

                            <h3>Related Posts</h3>
                            <React.Fragment>
                                {relPosts.map((post) => {
                                    return (
                                        <div>
                                            <Post post={post}> </Post>
                                        </div>
                                    );
                                })
                                }
                            </React.Fragment>
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>

                </Card.Body>
            </Card >
        </div >
    )
}
export default Post;

/*<Button style={{ display: "inline-block", marginRight: "10px", marginTop: "20px", marginBottom: "20px" }} variant="primary" onClick={showBoxes} id="showbutton">
Display Subimages </Button> */