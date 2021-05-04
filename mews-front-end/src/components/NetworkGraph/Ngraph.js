//import * as d3 from 'd3';
import React, { useState } from "react";
import { Graph } from 'react-d3-graph';
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Button from "react-bootstrap/Button";
//import Image from "react-bootstrap/Image";

function NetworkGraph(props){

       // const { pdata, ...rest } = props;

        const [modalShow, setModalShow] = useState(false);
        const [postData, setPostData] = useState(false);

        var data = props.data;
      //  console.log(data.nodes)
        //const data = require("./data3.data.js")
        
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
           const img = new Image(60, 45); // Using optional size for image
           img.onload = drawImageAS; // Draw when image has loaded
           img.src = pic_url;

           function drawImageAS() {
            // Use the intrinsic size of image in CSS pixels for the canvas element
                canvas.width = this.naturalWidth;
                canvas.height = this.naturalHeight;

                //console.log(pd.boxes)
                // Will draw the image as 300x227, ignoring the custom size of 60x45
                // given in the constructor
                context.drawImage(this, 0, 0);

                // To use the custom size we'll have to specify the scale parameters
                // using the element's width and height properties - lets draw one
                // on top in the corner:
                context.drawImage(this,0,0,canvas.width, canvas.height);
           };

        
        }; 

        const showBoxes = function() {
            console.log("in showBoxes")
           let canvas = document.getElementById("canvas");
           let context = canvas.getContext("2d");

           const img = new Image(60, 45); // Using optional size for image
           img.onload = drawImageActualSize; // Draw when image has loaded
           img.src = postData.image_url;

            function drawImageActualSize() {
            // Use the intrinsic size of image in CSS pixels for the canvas element
                canvas.width = this.naturalWidth;
                canvas.height = this.naturalHeight;

                console.log(postData.boxes)
                // Will draw the image as 300x227, ignoring the custom size of 60x45
                // given in the constructor
                context.drawImage(this, 0, 0);

                // To use the custom size we'll have to specify the scale parameters
                // using the element's width and height properties - lets draw one
                // on top in the corner:
                context.drawImage(this,0,0,canvas.width, canvas.height);
                //console.log(postData.boxes)
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
                                //console.log(arrayN[j][0])
                                context.strokeStyle = 'red';
                                context.lineWidth   = 7;
                                context.strokeRect(arrayN[j][0], arrayN[j][1], arrayN[j][2], arrayN[j][3]);
                                //context.strokeRect(0,0,300,300);
                                console.log("drawing boxesN");
                                //context.fillStyle = "#009900";
                                //context.fillRect(0,0,300,300);
                            }
                        }
                        //let array = JSON.parse("[" + i + "]");
                    /* var array = i.toString().split(",");
                        console.log(array)
                        console.log(array[0], array[1], array[2], array[3]);
                        context.strokeRect(array[0], array[1], array[2], array[3]);*/
                    }

                }
                //context.strokeRect(200, 50, 100, 100);
                //context.strokeRect(400, 50, 100, 100);
            }
        };


          // context.strokeRect(200, 50, 100, 100);
        
      
    

    
        
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
                            
                            <canvas width="500" height="500" id="canvas"></canvas>
                            <Button variant="primary" onClick={showBoxes} /*setModalShow(true) onClick={showModal}*/>
                                ShowBoxes </Button>
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