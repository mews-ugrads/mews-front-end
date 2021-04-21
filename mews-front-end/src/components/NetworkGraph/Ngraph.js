import * as d3 from 'd3';
import React, { useState } from "react";
import { Graph } from 'react-d3-graph'; 
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import axios from "axios";

function NetworkGraph(props){

    //render() {
        const [modalShow, setModalShow] = useState(false);
        const [postData, setPostData] = useState(false);

      //  console.log(this.props.CPostData)
        const data = props.CPostData;
        //const data = require("./data2.data")
        // the graph configuration, just override the ones you need
      //  const { id, image_url, post_url } = props

        const myConfig = require("./configT.config.js")

        const onClickNode = function(nodeId, node) {
            axios.get(`http://dsg3.crc.nd.edu:5000/posts/${nodeId}`).then((response) => {
                const allPosts = response.data;
                setPostData(allPosts)
               console.log(allPosts.image_url)
            }).catch(error => console.error("error"));
            //window.alert(`Clicked node ${nodeId}`);
          //  window.alert(`${nodeId} is ${node.svg}`) 
            /*const [modalShow, setModalShow] = React.useState(false);
            */
           setModalShow(true)

      };
        
        const onClickLink = function(source, target) {
            window.alert(`Clicked link between ${source} and ${target}`);
        };

        //const onMouseOverNode = function(nodeId, node) {
        //    window.alert(`Mouse over node ${nodeId} in position (${node.x}, ${node.y})`);
       //};
  





       
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