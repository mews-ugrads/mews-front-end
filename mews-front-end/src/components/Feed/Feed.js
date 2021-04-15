import React from "react";
import Post from "../Post/Post";

class Feed extends React.Component {
    /*   constructor() {
           super();
   
           this.state = {
               search: null,
           };
       }*/
    render() {


        return (
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