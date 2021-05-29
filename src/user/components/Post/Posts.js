import { useEffect ,useState} from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPosts } from "../../../redux/actions/postAction";
import AddPost from "./AddPost";
import PostItem from "./PostItem";
import Header from'../Header';
import {Link} from 'react-router-dom';
import Chatbox from "../Chat/Chatbox";
/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Posts() {


  const [allfollowers,setAllFollowers] = useState([]);
  const [sessions,setSessions] = useState([]);
   const [statechatbox, setStatechatbox] = useState("0");
  const [username, setUsername] = useState("");
  const config = {
    headers: {
        "Content-Type":"appliation/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
    }
}
    /**get all followers */

    axios.get(`https://aaweni.herokuapp.com/followuser/getFollowers1`, config)
    .then((response) => {
        setAllFollowers(response.data);
    console.log(response.data)
    })
    .catch((error) => {
    console.log(error)
    })

    axios.get(`https://aaweni.herokuapp.com/sessions/`, config)
    .then((response) => {
      setSessions(response.data);
    console.log(response.data)
    })
    .catch((error) => {
    console.log(error)
    })





  /* const [posts, setposts] = useState([]);

  useEffect(() => {
    axios.get("https://aaweni.herokuapp.com/pi/postRoute/post").then((res) => setposts(res.data.posts));
  }, []);
  console.log(posts);*/

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
   const posts = useSelector((state) =>
    state.postReducer.posts.filter((post) => post.Group === null)
  );

  return (
    <body>
      
    <Header />

    <div class="main_content">
      <div class="mcontainer">
 <div class="lg:flex lg:space-x-10">
        
     
        
            <div class="lg:w-3/4 lg:px-20 space-y-7">
              <AddPost></AddPost>
              {posts.map((post, index) => {
                return <PostItem post={post} key={post._id} />;
              })}
           
    </div>
   
    
    <div class="lg:w-72 w-full">
              
              
             
      
              <h3 class="text-xl font-semibold"> Contacts </h3>
      
             
      
              <div class="" uk-sticky="offset:80">
              
              <nav class="cd-secondary-nav border-b extanded mb-2">
                  <ul uk-switcher="connect: #group-details; animation: uk-animation-fade">
                      <li class="uk-active"><a class="active" href="#0">  Friends  <span> {allfollowers.length} </span> </a></li>
                      <li><a href="#0">Groups</a></li>
                  </ul>
              </nav>
  
              <div class="contact-list" style={{overflow: "hidden"}}>
              { allfollowers?.map((val,key) => {
  return(
                <div >
                  <Link to={`/userdetails/${val._id}`}>
                      <div class="contact-avatar">
                          <img src={val.profilePicture} alt=""/>
                          <span class="user_status status_online"></span>
                      </div>
                      <div class="contact-username"  onClick={() => {setStatechatbox(val._id) ; setUsername(val.username);}} > {val.username} </div>
                  </Link>
                  <div uk-drop="pos: left-center ;animation: uk-animation-slide-left-small">
                      <div class="contact-list-box">
                          <div class="contact-avatar">
                              <img src={val.profilePicture} alt=""/>
                              <span class="user_status status_online"></span>
                          </div>
                          <div class="contact-username">   {val.username}</div>
                         
                          <div class="contact-list-box-btns">
                              <button type="button" class="button primary flex-1 block mr-2">
                                  <i class="uil-envelope mr-1"></i> Send message</button>
                              <button type="button"  href="#" class="button secondary button-icon mr-2">
                                  <i class="uil-list-ul"> </i> </button>
                              <button type="button" a href="#" class="button secondary button-icon"> 
                                  <i class="uil-ellipsis-h"> </i> 
                              </button>
                          </div>
                      </div>
                  </div>
  </div>
  )
              })}
                  { allfollowers?.map((val,key) => {
      <a href="timeline.html" key={key}>
      <div class="contact-avatar">
          <img src="assets/images/avatars/avatar-4.jpg" alt=""/>
      </div>
      <div class="contact-username"> {val.username}</div>
  </a>

                 })}
                 {(statechatbox=="0"?( 
         <div></div>
                                ):(       <Chatbox  setStatechatbox={setStatechatbox} statechatbox={statechatbox} username={username} />))}
 
  
              </div>
  
  
          </div>
          </div>
         
         
          </div>
          </div>
          </div>
    </body>
  );
}
