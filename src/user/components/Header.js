import React ,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory'
import CreateRoom from "./videoChat/components/modal/CreateModal";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import JoinRoom from './videoChat/components/modal/Join';

const Header = ({history}) =>{
    const hi = createHistory()
  
  const [show, setShow] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [search, setSearch] = useState("");
    const [showCreateRoom, setShowCreateRoom] = useState(false);
  
    const showCreateRoomFunc = () => {
      setShowCreateRoom(!showCreateRoom);
    };
    const [showJoinRoom, setShowJoinRoom] = useState(false);
const [userId, setUserId] = useState("");
    const showJoinRoomFunc = () => {
      setShowJoinRoom(!showJoinRoom);
    };
    const [user, setUser]= useState(Object);
    const [notif, setNotif]= useState([]);

  
    const searchthroughenter =(event) => {
   
      setSearch(event.target.value);
      if (event.key  === 'Enter' ) {
       

         //alert(event.target.value)
       
        document.getElementById("searchenter").click();
        setSearch("");
    }
    
      
      
        }


    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login")
        }
                const config = {
                    headers: {
                        "Content-Type":"appliation/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }
                try {
                    axios.get("https://aaweni.herokuapp.com/api/auth/details_user",config).then((response)=>{
                        setUser(response.data.data);
                        console.log(user)});                    
                   
                } catch (error) {
                    console.log(error)
                }
                axios.get(`https://aaweni.herokuapp.com/notif/getAll`, config)
                .then((response) => {
                setNotif(response.data);
                console.log(response.data)
                })
                .catch((error) => {
                console.log(error)
                })
            }
    ,[history]);
    const logoutHandler = async () => {
        try {
            localStorage.clear()
            window.location.href = "/" ;
        } catch (err) {
            window.location.href = "/" ;
        }
    }
        return (
          

<div>

  <header style={{zIndex:100}}>
     
            <div class="header_wrap">
                <div class="header_inner mcontainer">
                    <div class="left_side">
                        
                        <span class="slide_menu" uk-toggle="target: #wrapper ; cls: is-collapse is-active">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2z" fill="currentColor"></path></svg>
                        </span>

                        <div id="logo">
                            <Link to={"/posts"}> 
                                <img src="assets/user/images/logoo.png" alt=""/>
                                <img src="assets/user/images/logoo.png" class="logo_mobile" alt="" />
                            </Link>
                        </div>
                    </div>
                  
                    <div class="header-search-icon" uk-toggle="target: #wrapper ; cls: show-searchbox"> </div>
                    <div class="header_search">
                    <input type="text" name="name" placeholder="Search for Friends ,Groups and more.." id="searchinput"  onKeyDown={searchthroughenter}/>
                       <i class="uil-search-alt"></i>
                       <Link to={`/search/${search}`}>
                       <button id="searchenter" type="hidden"></button>
                       </Link> 
                    </div>
                    <button primary large>
                    <ion-icon name="mic-outline" onMouseDown={SpeechRecognition.startListening}    style={{height:"400px",width:"30px",marginTop:"-10px"}}></ion-icon>
</button>
<p>{transcript}</p>
                    <div uk-drop="mode: click" class="hidden md:w-1/3 w-11/12 shadow-lg rounded-md -mt-2 bg-white">
                        <div class="-mt-2 p-3">
                            <h4 class="font-semibold mb-1 mt-2 px-2.5 text-lg"> Recently  </h4>
                            <ul>
                                <li>
                                    <a href="#" class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"> 
                                        <img src="assets/user/images/avatars/avatar-4.jpg" alt="" class="border mr-3 rounded-full shadow-sm w-8"/>
                                        Erica Jones
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"> 
                                        <img src="assets/user/images/group/group-2.jpg" alt="" class="border mr-3 rounded-full shadow-sm w-8"/>
                                        Coffee  Addicts
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"> 
                                        <img src="assets/user/images/group/group-4.jpg" alt="" class="border mr-3 rounded-full shadow-sm w-8"/>
                                         Mountain Riders
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"> 
                                        <img src="assets/user/images/group/group-5.jpg" alt="" class="border mr-3 rounded-full shadow-sm w-8"/>
                                        Property Rent And Sale 
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
    
                    <div class="right_side">
    
                        <div class="header_widgets">
                        <Link to={"/posts"} class="is_link"> 
                               Home
                            </Link>
                          
                        
                            <a href="#" class="is_icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span>1</span>
                            </a>
                            <div uk-drop="mode: click" class="header_dropdown">
                                 <div  class="dropdown_scrollbar" data-simplebar>
                                     <div class="drop_headline">
                                         <h4>Notifications </h4>
                                         <div class="btn_action">
                                         <Link to="/notifications"><a>
                                                 <i class="icon-feather-settings" uk-tooltip="title: Notifications settings ; pos: left" title="" aria-expanded="false"></i>
                                             </a></Link>
                                         </div>
                                     </div>
                                     <ul>
                                     { notif?.map((val,key) => {
                                            return(
                                                
                                        <li key={key}>
                                         
                                         <Link to={`/userdetails/${val._id}`}><a>
                                                 <div class="drop_avatar"> <img src={val.profilePicture} alt=""/>
                                                 </div>
                                                 <div class="drop_text">
                                                     <p>
                                                         You have a new invitation from <strong> {val.username}</strong>
                                                         <span class="text-link"> View his profile</span>
                                                     </p>
                                                     
                                                 </div>
                                             </a>
                                             </Link>
                                         </li>
                                            )})}
                                     </ul> 
                                 </div>
                            </div> 

                              {/*<!-- Message --> */}
                              <Link to={`/chat/${user._id}`}  >
                            <a href="#" class="is_icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                                <span>4</span>
                            </a>
                            </Link>
                    
                            <Link to="/postsprofile">
                                <img src={user.profilePicture} class="is_avatar" alt=""/>
                            </Link>
                            <div uk-drop="mode: click;offset:5" class="header_dropdown profile_dropdown">

                                <Link to="/postsprofile" class="user">
                                    <div class="user_avatar">
                                        <img src={user.profilePicture} alt=""/>
                                    </div>
                                    <div class="user_name">
                                        <div> {user.username} </div>
                                        <span> {user.email} </span>
                                    </div>
                                </Link>
                                <hr class="border-gray-100"/>
                                <a>
                                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
                                    <Link to="/postsprofile">My Account </Link>
                                    
                                </a>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"  clip-rule="evenodd" />
                                    </svg>
                                    <Link to="/mypages" class="lg:px-2">Manage Pages</Link>
                                    
                                </a>
                              
                           
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                    </svg>
                                    <Link to="/" onClick={logoutHandler}>Logout </Link>
                                </a>

                                
                            </div>

                        </div>
                        
                    </div>
                </div>
            
            </div>
  </header>


       {/*  <!-- sidebar -->*/}
       
        <div class="sidebar">
            <div class="sidebar_header"> 
                <img src="assets/user/images/logo.png" alt=""/>
                <img src="assets/user/images/logo-icon.html" class="logo-icon" alt=""/>

                <span class="btn-mobile" uk-toggle="target: #wrapper ; cls: is-collapse is-active"></span>

            </div>
        
            <div class="sidebar_inner" data-simplebar>
        
                <ul>
                    <li class="active">
                  <Link to={"/posts"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="text-blue-600"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <span> Feed </span>
                  </Link>
               		 </li>
                    <li><Link to="/pages">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-yellow-500">
                          <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd"></path>
                        </svg> 
                          Pages </Link>
                    </li>
                    <Link to={`/groups`}  alt="enlarge your experience">
                    <li><a > 
                   
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-blue-500">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg><span> Groups </span></a> 
                    </li>
                    </Link>
                    <li>
                        <Link to="/homecourse" alt="online courses">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-green-500">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                        <span> Course</span>
                        </Link> 
                    </li>
					<li>
                    <Link to={"/jobs"} alt="provide opportunities">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="text-pink-500"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    <span> Jobs</span>
                  </Link>
                    </li>
                  
                   <li><a href="javascript:void(0);"     > 
                 
                  
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-red-500">
                            <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd" />
                            <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                        </svg>
                        <span> Room </span> 
                        <div uk-drop="mode: click;offset:5" class="header_dropdown profile_dropdown">


<button  onClick={ showCreateRoomFunc} style={{marginLeft:"20px"}} >
    Create Room
</button>
<br/>
<button style={{marginLeft:"20px"}}   onClick={ showJoinRoomFunc}>
   
    Join  Room 
</button>



</div>
</a> 
                    </li>
                    {showCreateRoom ? (
        <CreateRoom
          show
          onclick={showCreateRoomFunc}
          title="Create Your Own Room"
          placeholder="Enter Your Room"
          btnName="Create"
        />
      ) : (
        <CreateRoom />
      )}

{showJoinRoom ? (
        <JoinRoom
          show
          onclick={showJoinRoomFunc}
          title="Join A Room"
          placeholder="Paste Your URL Room"
          btnName="Join"
        />
      ) : (
        <JoinRoom />
      )}
                    <li id="more-veiw" hidden><Link to="/profile_accepted" alt="build career"> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-yellow-500">
                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                          </svg><span>  ProfileAccepted </span></Link> 
                    </li> 
                   
                   
                    <li id="more-veiw" hidden>
                  <Link to={"/problems"} alt="share problems">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="text-blue-500"
                    >
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                    </svg>
                    <span> forum</span>
                  </Link>
                </li>
                </ul>

           
                <a href="#" class="see-mover h-10 flex my-1 pl-2 rounded-xl text-gray-600" uk-toggle="target: #more-veiw; animation: uk-animation-fade"> 
                    <span class="w-full flex items-center" id="more-veiw">
                        <svg class="  bg-gray-100 mr-2 p-0.5 rounded-full text-lg w-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        See More  
                    </span>
                    <span class="w-full flex items-center" id="more-veiw" hidden>
                        <svg  class="bg-gray-100 mr-2 p-0.5 rounded-full text-lg w-7"  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg> 
                        See Less 
                    </span>
                </a> 


                
             
                <br/>
                <br/>
                
 
            </div>
        
        </div> 


        </div>
 )
}

export default Header;
