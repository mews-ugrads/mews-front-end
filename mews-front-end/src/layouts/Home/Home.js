import axios from "axios";
import NetworkGraph from "../../components/NetworkGraph/Ngraph";

function Home() {
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        getPosts();


        // console.log("useEffect");
    }, []);

    const getPosts = () => {
        //const response = await axios.get("http://127.0.0.1:5000/posts/trending");

        /*   const response = await axios.get("http://dsg3.crc.nd.edu:5000/posts/trending").then((res) => {
               console.log(response.data)
               setPostData(response.data.Data.Results)
               console.log(postData)
   
           })*/
        //  const response = await axios.get("http://dsg3.crc.nd.edu:5000/posts/trending")
        //  const response = await axios.get("http://dsg3.crc.nd.edu:5000/posts/1053626")
        axios.get("http://dsg3.crc.nd.edu:5000/posts/trending?amount=7").then((response) => {
            console.log("get")
            //  console.log(response.data.postData)
            const allPosts = response.data;
            //     console.log(allPosts);
            setPostData(allPosts);
            //console.log(postData)
        }).catch(error => console.error("error"));
        //  console.log(response.data)
        //console.log(allPosts)

        // console.log(postData)
        //  setPostData([...postData, response.data]);



    };



    return (
        <div className="Home">
            <Header />
            <h2 style={{
                textAlign: "left"
            }}> Trending Posts</h2 >
            <Feed postData={postData}
            />
            <br>
            </br>
            <h2 style={{
                textAlign: "left"
            }}> Central Posts</h2 >
            <NetworkGraph />
                <h2 style={{
                    textAlign: "left"
                }}> Network Graph</h2 >



        </div>
    );

    /*
        <h2 style={{
                textAlign: "left"
            }}> Relatedness Posts</h2 >
            <h2 style={{
                textAlign: "left"
            }}> Trending Words</h2 >
    */

    /* return (
                    <p>ID: {postData.id}</p>
            <p>Image url: {postData.image_url}</p>
            <img alt="" src={postData.image_url} />
            <p>Post url: {postData.post_url}</p>
            <p>Replies: {postData.replies}</p>
            <p>Reposts: {postData.reposts}</p>
            <p>User id: {postData.user_id}</p>
            <p>When posted: {postData.when_posted}</p>

         < div className="Home" >
             <h2 style={{
                 textAlign: "left"
             }}> Trending Posts</h2 >
             <h2 style={{
                 textAlign: "left"
             }}> Relatedness Posts</h2 >
             <h2 style={{
                 textAlign: "left"
             }}> Trending Words</h2 >
             <h2>{postData.id}</h2>
 
         </div >
     );*/

}

export default Home;
