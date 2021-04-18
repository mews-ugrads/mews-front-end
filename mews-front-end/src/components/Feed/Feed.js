import React from "react";
import Post from "../Post/Post";
//import HorizontalScroll from 'react-scroll-horizontal'
import Row from "react-bootstrap/Row";

class Feed extends React.Component {
    /*   constructor() {
           super();
   
           this.state = {
               search: null,
           };
       }*/
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

       // <ImgCard post={post}> </ImgCard>

export default Feed;

   /*  return (
              <React.Fragment>
                  {this.props.trendingArray.map((post) => {
                      return (
                          <div>
                              <ImgCard post={post}> </ImgCard>
                          </div>
                      );
                  })
  
                  }
              </React.Fragment>
  
  
          );*/