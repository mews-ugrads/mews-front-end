import * as d3 from 'd3';
import React, { useState } from "react";
import { Graph } from 'react-d3-graph'; 
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import axios from "axios";

function NetworkGraph(props){

       // const { pdata, ...rest } = props;

        const [modalShow, setModalShow] = useState(false);
        const [postData, setPostData] = useState(false);

        const data = props.data;
        //const data = require("./dataD.data.js")
        
        /*const data = {
            nodes: data1.nodes,
            links: data1.links,
            focusedNodeId: "nodeIdToTriggerZoomAnimation"
         };*/

        const myConfig = require("./configT.config.js")

    
        const onClickNode = function(nodeId, node) {
        
            axios.get(`http://dsg3.crc.nd.edu:5000/posts/${nodeId}`).then((response) => {
                const allPosts = response.data;
                setPostData(allPosts)
               console.log(allPosts.image_url)
            }).catch(error => console.error("error"));
            //window.alert(`Clicked node ${nodeId}`);
          //  window.alert(`${nodeId} is ${node.svg}`) 
           setModalShow(true)

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
                            <h2> Image {data.image_url}</h2>
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