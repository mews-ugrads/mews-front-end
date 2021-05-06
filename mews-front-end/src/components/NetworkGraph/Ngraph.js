//import * as d3 from 'd3';
import React, { useState } from "react";
import { Graph } from 'react-d3-graph';
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Button from "react-bootstrap/Button";
//import Image from "react-bootstrap/Image";

function NetworkGraph(props){

        const [modalShow, setModalShow] = useState(false);
        const [postData, setPostData] = useState(false);

        var data = props.data;


        const myConfig = require("./configT.config.js")
    
        const onClickNode = function(nodeId, node) {             
       
            axios.get(`http://dsg3.crc.nd.edu:5000/posts/${nodeId}`).then((response) => {
                const allPosts = response.data;
                setPostData(allPosts);
               //console.log(allPosts.image_url)
            }).catch(error => console.error("error"));
            //window.alert(`Clicked node ${nodeId}`);
          //  window.alert(`${nodeId} is ${node.svg}`) 
            console.log(node.svg)
            showModal(node.svg);
        };

        const showModal = function(pic_url) {
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
                let WRfactor = 750/this.naturalWidth;
                let HRfactor = 750/this.naturalHeight;

                canvas.width = this.naturalWidth * WRfactor;
                canvas.height = this.naturalHeight * HRfactor;

                context.drawImage(this,0,0,this.naturalWidth * WRfactor, this.naturalHeight * HRfactor);
           };

        
        }; 

        const showBoxes = function() {
            console.log("in showBoxes")
           let canvas = document.getElementById("canvas");
           let context = canvas.getContext("2d");

           const img = new Image(0,0); // Using optional size for image
           img.onload = drawImageActualSize; // Draw when image has loaded
           img.src = postData.image_url;

            function drawImageActualSize() {
            // Use the intrinsic size of image in CSS pixels for the canvas element
                let WRfactor = 750/this.naturalWidth;
                let HRfactor = 750/this.naturalHeight;

                canvas.width = this.naturalWidth * WRfactor;
                canvas.height = this.naturalHeight * HRfactor;

                console.log(postData.boxes)

                context.drawImage(this,0,0,this.naturalWidth * WRfactor, this.naturalHeight * HRfactor);//canvas.width, canvas.height);

                if (postData.boxes != null){
                 
                    var len = (postData.boxes).length;
                    for(var i = 0; i < len; i++){
                        console.log("drawing boxes");
                        let array = postData.boxes[i]
                        console.log(array)
                        if(array != null){
                            let arrayN = JSON.parse("[" + array + "]");
                            let lenN = arrayN.length;
                            for(var j = 0; j < lenN; j++){
                                context.strokeStyle = 'red';
                                context.lineWidth   = 7;
                                context.strokeRect(arrayN[j][0]*WRfactor, arrayN[j][1]*HRfactor, (arrayN[j][2]- arrayN[j][0])*WRfactor, (arrayN[j][3]-arrayN[j][1])*HRfactor);

                                console.log("drawing boxesN");

                            }
                        }

                    }

                }

            }
        };

        
      
    

    
        
        const onClickLink = function(source, target) {
            window.alert(`Clicked link between ${source} and ${target}`);
        }; 

       
       return (
     <div>
         
            <Graph 
                id="graph-id" // id is mandatory
                data={data}
                config={myConfig}
            //   onClickNode={() => setModalShow(true)}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
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
                            
                            <canvas width="0" height="0" id="canvas"></canvas>
                            <Button variant="primary" onClick={showBoxes} /*setModalShow(true) onClick={showModal}*/>
                                ShowBoxes </Button>
                            <p>ID: {postData.id}</p>
                            <p>Replies: {postData.replies}</p>
                            <p>Reposts: {postData.reposts}</p>
                            <p>Likes: {postData.likes}</p>

                            <p>Posted: {postData.when_posted}</p>
                            <p>Related Text: {postData.related_text}</p>
                            <p>OCR Text: {postData.ocr_text}</p>
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>

   
          
                    </div>
         );
   // }
 
}

export default NetworkGraph;

/* */