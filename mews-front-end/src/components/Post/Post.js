import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
//import MyModal from "../MyModal/MyModal";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import axios from "axios";
//import Feed from "../Feed/Feed";

function Post(props) {
    const [modalShow, setModalShow] = useState(false);
    //  const [relPosts, setRelPosts] = useState([]);
    const { image_url, post_url, when_posted, likes, reposts, replies, id, related_text, ocr_text } = props.post;

    const getRelated = () => {
       /* axios.get(`http://dsg3.crc.nd.edu:5000/related/${id}`).then((response) => {
            //console.log("related")

            console.log(response.data)
            //  console.log(response.data.postData)
            //console.log(allPosts);
            //   const allRelPosts = response.data;
            //  console.log(allRelPosts)
            // if ((response.data.length) > 0) {
            //console.log("related")
            // console.log(relPosts.id);
            //  setRelPosts(allRelPosts);
            //}
            //console.log(postData)
        }).catch(error => console.error("error"));*/
    }

    useEffect(() => {
        getRelated();
        //console.log("useEffect");
    });
    return (
        <div>
            <Card style={{ width: '18rem', margin: "7px" }}>
                <a href={post_url}>
                    <Card.Img variant="top" src={image_url} />
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
                            <p>Replies: {replies}</p>
                            <p>Reposts: {reposts}</p>
                            <p>Likes: {likes}</p>

                            <p>Posted: {when_posted}</p>
                            <p>Related Text: {related_text}</p>
                            <p>OCR Text: {ocr_text}</p>
                            <h2> Related Posts </h2>

                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card >
        </div >
    )
}
/*
function Post(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const { image_url, post_url } = props.post;
    //  const { id } = props.post;
    return (
        <Card style={{ width: '18rem' }}>
            <a href={post_url}>
                <Card.Img variant="top" src={image_url} />
            </a>
            <Card.Body>

                <Button variant="primary" onClick={() => setModalShow(true)}>
                    View </Button>



                <MyModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Card.Body>
        </Card >
    )
}
function MyVerticallyCenteredModal(props) {

    const { image_url } = props.post;

    return (
        <Modal
            animation={false}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <p>{image_url}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function Post(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const { image_url, post_url } = props.post;
    //  const { id } = props.post;
    return (
        <Card style={{ width: '18rem' }}>
            <a href={post_url}>
                <Card.Img variant="top" src={image_url} />
            </a>
            <Card.Body>

                <Button variant="primary" onClick={() => setModalShow(true)}>
                    View </Button>



                <MyModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Card.Body>
        </Card >
    )
}


/*class ImgCard extends React.Component {
    render() {
        console.log('I was triggered during render')

        return (

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                   </Card.Text>
                    <>
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Launch vertically centered modal
        </Button>

                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </>                </Card.Body>
            </Card>


        );
    }
}*/


export default Post;