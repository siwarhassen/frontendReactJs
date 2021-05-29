import React,{useState , useEffect} from 'react';
import axios from 'axios';
import Header from '../Header';
import { useDispatch ,useSelector} from 'react-redux';
import {fetchconnectuser,selectoneuser,selectSessionUser} from "../../../redux/slices/userSlice";
import AddPost from '../Post/AddPost';
import PostItem from '../Post/PostItem';
import { deletePost, getPosts } from "../../../redux/actions/postAction";
import {Link} from 'react-router-dom';
import Chatbox from "../Chat/Chatbox";
const PrivateScreen = ({history}) => {
    const [error, setError]= useState("");
    const [privateData, setPrivateData]= useState("");
const [statechatbox, setStatechatbox] = useState("0");
  const [username, setUsername] = useState("");
    const [allfollowers,setAllFollowers] = useState([]);
    const [sessions,setSessions] = useState([]);
 /**get all followers */
 const config = {
  headers: {
      "Content-Type":"appliation/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`
  }
}
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

    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login")
        }

        const fetchPrivateData = async () =>{
            const config = {
                headers: {
                    "Content-Type":"appliation/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

            try {
                const {data} = await axios.get("https://aaweni.herokuapp.com/api/private",config);
                setPrivateData(data.data);
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized please login !!")
            }
        }
        fetchPrivateData();
    },[history]);
const dispatch = useDispatch();

 useEffect(() => {
        dispatch(fetchconnectuser());
        }, [dispatch]);
        const user=useSelector(selectSessionUser)[0];
      
        localStorage.setItem("role" , user.role);
       localStorage.setItem("connecteduser" , user._id);
    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        history.push("/login");
    };

    useEffect(() => {
      dispatch(getPosts());
    }, [dispatch]);
    const posts = useSelector((state) => state.postReducer.posts);
    return error ? (
        <span>{error}</span>
    ) : (
        <>
      {/**  
       <div style={{ background: "green", color: "white" }}>{privateData.map(home => <div>{home.data}</div>)}</div>
       <button onClick={logoutHandler}>Logout</button>
       */} 
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
                   <Link >
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
        </>
    );
};

export default PrivateScreen;
