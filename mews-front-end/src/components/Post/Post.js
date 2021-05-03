import React, { useEffect, useState, ReactDOM } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//import MyModal from "../MyModal/MyModal";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import axios from "axios";
//import Feed from "../Feed/Feed";

function Post(props) {
    const port = 5002
    const [modalShow, setModalShow] = useState(false);
    const [relPosts, setRelPosts] = useState([]);

    const { image_url, post_url, when_posted, likes, reposts, replies, id, related_text, ocr_text } = props.post;
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

    /* const showModal = () => {
         
     }*/
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

                    <Button variant="primary" onClick={() => setModalShow(true)} /*onClick={showModal}*/>
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
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>

                            <a href={post_url}>
                                <Image src={image_url} fluid />

                            </a>
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