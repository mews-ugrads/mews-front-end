import React, { useEffect, useState, ReactDOM } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//import MyModal from "../MyModal/MyModal";
import Modal from "react-bootstrap/Modal";
import {Image as BImage} from "react-bootstrap/Image";
import axios from "axios";
//import Feed from "../Feed/Feed";

function Post(props) {
    const port = 5000;
    const [modalShow, setModalShow] = useState(false);
    const [relPosts, setRelPosts] = useState([]);

    let { image_url, post_url, when_posted, likes, reposts, replies, id, related_text, ocr_text, boxes } = props.post;
    useEffect(() => {
        getRelated();
    }, []);
    
    const getRelated = () => {
        axios.get(`http://dsg3.crc.nd.edu:${port}/posts/${id}/related`).then((response) => {
            const allRelPosts = response.data;
           // console.log("ALL", allRelPosts)
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

    const showModal = function() {
        setModalShow(true)
       // if(boxes.length < 1){
       //     document.getElementById('img').style.visibility = 'none';
       // }
       // let canvas = document.getElementById("canvas");
       //let canvas = document.getElementById("canvas");

      // if(canvas != null) {canvas.onload = drawCanv(canvas); } 

    };

 /*   const drawCanv = function(canva) {
        console.log("in drawCanv")
        let canvas = document.getElementById("canvas");
           //let canvas = document.getElementById("canvas");
                let context = canva.getContext("2d");
                const img = new Image(60, 45); // Using optional size for image
                document.getElementById("image").style.visibility = 'hidden'; 
                img.onload = drawImageAS; // Draw when image has loaded
                img.src = image_url;
            

                function drawImageAS() {
                    // Use the intrinsic size of image in CSS pixels for the canvas element
                        let WRfactor = 750/this.naturalWidth;
                        let HRfactor = 750/this.naturalHeight;

                        canva.width = this.naturalWidth;
                        canva.height = this.naturalHeight;

                        context.drawImage(this,0,0,canva.width * WRfactor, canva.height * HRfactor);//canvas.width, canvas.height);
                };
           // }

           //setModalShow(true)

    }; */

    const showBoxes = function() {
      if(boxes.length > 0 ){
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
                let WRfactor = 750/this.naturalWidth;
                let HRfactor = 750/this.naturalHeight;

                canvas.width = this.naturalWidth * WRfactor;
                canvas.height = this.naturalHeight * HRfactor;

                console.log(boxes)

                context.drawImage(this,0,0,this.naturalWidth * WRfactor, this.naturalHeight * HRfactor);//canvas.width, canvas.height);

                if (boxes != null){
                
                    var len = (boxes).length;
                    for(var i = 0; i < len; i++){
                        console.log("drawing boxes");
                        let array = boxes[i]
                        console.log(array)
                        if(array != null){
                            let arrayN = JSON.parse("[" + array + "]");
                            let lenN = arrayN.length;
                            for(var j = 0; j < lenN; j++){
                                context.strokeStyle = 'red';
                                context.lineWidth   = 7;
                                context.strokeRect(arrayN[j][0]*WRfactor, arrayN[j][1]*HRfactor, (arrayN[j][2]*WRfactor - arrayN[j][0]*WRfactor), (arrayN[j][3]*HRfactor-arrayN[j][1]*HRfactor));

                                console.log("drawing boxesN");

                            }
                        }

                    }

                }

            };

      }
     };




  
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

                            <img  src={image_url} id="my_image" width="750" height="750"/>
                            <canvas width="0" height="0" id="canvas" ></canvas>
                            
                            <Button variant="primary" onClick={showBoxes} id="showbutton"/*setModalShow(true) onClick={showModal}*/>
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