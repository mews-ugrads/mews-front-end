//import * as d3 from 'd3';
import React, { useState } from "react";
import { Graph } from 'react-d3-graph';
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function NetworkGraph(props){

       // const { pdata, ...rest } = props;

        const [modalShow, setModalShow] = useState(false);
        const [postData, setPostData] = useState(false);

       // var data = props.data;
      //  console.log(data.nodes)
        const data = require("./data3.data.js")
        
        /*const data = {
            nodes: data1.nodes,
            links: data1.links,
            focusedNodeId: "nodeIdToTriggerZoomAnimation"
         };*/

        const myConfig = require("./configT.config.js")

    
        const onClickNode = function(nodeId, node) {

         /*   data = {
                nodes: data.nodes,
                links: data.dlinks,
                focusedNodeId: nodeId,
             };
             console.log(data) 
        */
             
        
            axios.get(`http://dsg3.crc.nd.edu:5000/posts/${nodeId}`).then((response) => {
                const allPosts = response.data;
                setPostData(allPosts)
               console.log(allPosts.image_url)
            }).catch(error => console.error("error"));
            //window.alert(`Clicked node ${nodeId}`);
          //  window.alert(`${nodeId} is ${node.svg}`) 
           setModalShow(true)

           console.log("in modal")
           let canvas = document.getElementById("canvas");
           let context = canvas.getContext("2d");
          /* var img = new Image();
           //console.log(node.svg);

           img.onload = function() {
               
                context.drawImage(img, 0, 0, this.width, this.height);   
                context.strokeRect(200, 50, 100, 100);
                context.strokeRect(400, 50, 100, 100);
           };
           img.src = node.svg;
            */
           const img = new Image(60, 45); // Using optional size for image
           img.onload = drawImageActualSize; // Draw when image has loaded

            // Load an image of intrinsic size 300x227 in CSS pixels
            img.src = node.svg;

            function drawImageActualSize() {
            // Use the intrinsic size of image in CSS pixels for the canvas element
                canvas.width = this.naturalWidth;
                canvas.height = this.naturalHeight;

                console.log(postData.boxes)
                // Will draw the image as 300x227, ignoring the custom size of 60x45
                // given in the constructor
               // context.drawImage(this, 0, 0);

                // To use the custom size we'll have to specify the scale parameters
                // using the element's width and height properties - lets draw one
                // on top in the corner:
                context.drawImage(this, 0, 0, 100, 100 * 500/500);
                var len = postData.boxes.length;
                for(var i = 0; i < len; i++){
                    console.log("drawing boxes");
                    console.log(i[0], i[1], i[2], i[3], i[4]);
                    context.strokeRect(i[0], i[1], i[2], i[3], i[4]);
                }
                //context.strokeRect(200, 50, 100, 100);
                //context.strokeRect(400, 50, 100, 100);
            }


          // context.strokeRect(200, 50, 100, 100);
        
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
                            <h2> Image {postData.image_url}</h2>
                            <canvas width="500" height="500" id="canvas"></canvas>
                            <h2> Related Posts {postData.id}</h2>
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