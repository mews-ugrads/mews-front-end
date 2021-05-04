import React, { useEffect, useState, ReactDOM } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//import MyModal from "../MyModal/MyModal";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import axios from "axios";
//import Feed from "../Feed/Feed";

function Post(props) {
    const port = 5000
    const [modalShow, setModalShow] = useState(false);
    const [relPosts, setRelPosts] = useState([]);
    //const [boxShow, setBoxShow] = useState(false);

    let { image_url, post_url, when_posted, likes, reposts, replies, id, related_text, ocr_text, boxes } = props.post;
    const str1 = `http://dsg3.crc.nd.edu:${port}`
    image_url = str1.concat(image_url)
    useEffect(() => {
        getRelated();
    }, []);

    const getRelated = () => {
        axios.get(`http://dsg3.crc.nd.edu:${port}/posts/${id}/related`).then((response) => {
            const allRelPosts = response.data;
            console.log("ALL", allRelPosts)
            console.log(allRelPosts.length)
            for (let i = 0; i < allRelPosts.length; i++) {
                console.log(id)
                axios.get(`http://dsg3.crc.nd.edu:${port}/posts/${allRelPosts[i].id}`).then((res) => {
                    relPosts.push(res.data)
                    console.log("res", res.data)
                    console.log("rel", relPosts)
                }).catch(error => console.error("error"));
            }
        }).catch(error => console.error("error"));
    }

    const showBoxes = function() {

        console.log("in showBoxes")
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");

        const img = document.getElementById("image");//new Image(60, 45); // Using optional size for image
        img.onload = drawImageActualSize; // Draw when image has loaded

         // Load an image of intrinsic size 300x227 in CSS pixels
         img.src = image_url;

        console.log(boxes);

        function drawImageActualSize() {
         // Use the intrinsic size of image in CSS pixels for the canvas element
             canvas.width = this.naturalWidth;
             canvas.height = this.naturalHeight;

             console.log(boxes)
             // Will draw the image as 300x227, ignoring the custom size of 60x45
             // given in the constructor
            // context.drawImage(this, 0, 0);

             // To use the custom size we'll have to specify the scale parameters
             // using the element's width and height properties - lets draw one
             // on top in the corner:
             context.drawImage(this, 0, 0, 100, 100 * 500/500);
             var len = boxes.length;
             for(var i = 0; i < len; i++){
                 console.log("drawing boxes");
                 console.log(i[0], i[1], i[2], i[3], i[4]);
                 context.strokeRect(i[0], i[1], i[2], i[3], i[4]);
             }
        }
    }



  
    return (


        <div>
            <Card style={{
                width: '14rem', margin: "10px"
            }}>
                <a href={post_url}>
                    <Card.Img variant="top" src={image_url} style={{
                        height: "18vw", width: "100%",
                        objectFit: "cover"
                    }} />
                </a>
                <Card.Body>

                    <Button variant="primary" onClick={() => setModalShow(true)} /*setModalShow(true) onClick={showModal}*/>
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

                            <a href={post_url}>
                                <canvas  id="canvas">
                                    <Image src={image_url} fluid id="image"/>
                                </canvas>

                            </a>
                            <canvas width="500" height="500" id="canvas"></canvas>
                            <Button variant="primary" onClick={showBoxes} /*setModalShow(true) onClick={showModal}*/>
                                ShowBoxes </Button>
                            <p>ID: {id}</p>
                            <p>Replies: {replies}</p>
                            <p>Reposts: {reposts}</p>
                            <p>Likes: {likes}</p>

                            <p>Posted: {when_posted}</p>
                            <p>Related Text: {related_text}</p>
                            <p>OCR Text: {ocr_text}</p>
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