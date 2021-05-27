import React ,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import CreateRoom from "./videoChat/components/modal/CreateModal";


import JoinRoom from './videoChat/components/modal/Join';

const LeftPanelJob = ({history}) =>{
 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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


       {/*  <!-- sidebar -->*/}
       
       <div class="sidebar">
            <div class="sidebar_header"> 
                <img src="assets/user/images/logo.png" alt=""/>
                <img src="assets/user/images/logo-icon.html" class="logo-icon" alt=""/>

                <span class="btn-mobile" uk-toggle="target: #wrapper ; cls: is-collapse is-active"></span>

            </div>
        
            <div class="sidebar_inner" data-simplebar>
        
                <ul>
                    <li>
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
                    <li  ><a > 
                   
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-blue-500">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg><span> Groups </span></a> 
                    </li>
                    </Link>
                    <li >
                        <Link to="/homecourse" alt="online courses">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-green-500">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                        <span> Course</span>
                        </Link> 
                    </li>
					<li class="active">
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

export default LeftPanelJob;
