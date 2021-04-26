import React, { useEffect, useState, ReactDOM } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//import MyModal from "../MyModal/MyModal";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import axios from "axios";
//import Feed from "../Feed/Feed";

function Post(props) {
    const [modalShow, setModalShow] = useState(false);
    const [relPosts, setRelPosts] = useState([]);
    const { image_url, post_url, when_posted, likes, reposts, replies, id, related_text, ocr_text } = props.post;
    console.log("props", props.post)
    useEffect(() => {
        getRelated();
        // console.log("useEffect");
    }, []);

    const getRelated = () => {
        axios.get(`http://dsg3.crc.nd.edu:5000/posts/${id}/related`).then((response) => {
            const allRelPosts = response.data;
            console.log("ALL", allRelPosts)
            console.log(allRelPosts.length)
            for (let i = 0; i < allRelPosts.length; i++) {
                console.log(allRelPosts[i].id)
                axios.get(`http://dsg3.crc.nd.edu:5000/posts/${id}`).then((res) => {
                    setRelPosts(res.data);
                    //relPosts.push(res.data)
                }).catch(error => console.error("error"));
            }
        }).catch(error => console.error("error"));
    }

    console.log("rel", relPosts)


    return (


        <div>
            <Card style={{
                width: '18rem', margin: "10px"
            }}>
                <a href={post_url}>
                    <Card.Img variant="top" src={image_url} style={{
                        height: "10vw", width: "100%",
                        objectFit: "cover"
                    }} />
                </a>
                <Card.Body>

                    <Button variant="primary" onClick={() => setModalShow(true)}>
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

/*
     <React.Fragment>
                                {this.props.relPosts.map((post) => {
                                    return (
                                        <div>
                                            <Post post={post}> </Post>
                                        </div>
                                    );
                                })
                                }
                            </React.Fragment>
*/