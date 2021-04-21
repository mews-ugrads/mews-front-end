import * as d3 from 'd3';
import React from "react"; 
import { Graph } from 'react-d3-graph'; 
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";


function NetworkGraph(props){
   // render() {

        const data = require("./data2.data.js");
        
        // the graph configuration, just override the ones you need
        
        const myConfig = require("./configT.config.js")

        const onClickNode = function(nodeId, node) {
            //window.alert(`Clicked node ${nodeId}`);
            //window.alert(`${nodeId} is ${node.svg}`) 
            const [modalShow, setModalShow] = React.useState(false);
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

                            <a href={post_url}>
                                <Image src={image_url} fluid />

                            </a>
                            <p>Replies: {replies}</p>
                            <p>Reposts: {reposts}</p>
                            <p>Likes: {likes}</p>

                            <p>Posted: {when_posted}</p>
                            <h2> Related Posts </h2>
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>
        };
        
        const onClickLink = function(source, target) {
            window.alert(`Clicked link between ${source} and ${target}`);
        };

        //const onMouseOverNode = function(nodeId, node) {
        //    window.alert(`Mouse over node ${nodeId} in position (${node.x}, ${node.y})`);
       //};
  





       
       return (
        // <Test_component>
            <Graph 
                id="graph-id" // id is mandatory
                data={data}
                config={myConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
               // onMouseOverNode={onMouseOverNode}
            />


            //</Test_component>
            
         );
    //}
  
}

export default NetworkGraph;