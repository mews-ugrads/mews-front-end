import React from "react";
import Post from "../Post/Post";
import Row from "react-bootstrap/Row";

class Feed extends React.Component {
    render() {
        return (
            <Row>
                <React.Fragment>
                    {this.props.postData.map((post) => {
                        return (
                            <div>
                                <Post post={post}> </Post>
                            </div>
                        );
                    })
                    }
                </React.Fragment>
            </Row>
        );
    }
}

export default Feed;