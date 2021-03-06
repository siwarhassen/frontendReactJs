import React,{useState , useEffect} from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useDispatch ,useSelector} from 'react-redux';
import {fetchconnectuser,selectoneuser,selectSessionUser,selectUsers} from "../../redux/slices/userSlice";
import Moment from "react-moment";

import PostItem from '../components/Post/PostItem';
import { deletePost, getPosts } from "../../redux/actions/postAction";
import { searchcoursesbyName, selectCourses } from '../../redux/slices/coursesSlice';
import {  selectPages } from '../../redux/slices/pagesSlice';
import { useApi } from '../../hooks/useApi';
import { queryApi } from '../../utils/queryApi';
import JobItem from './Job/JobItem';

import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom';
import { selectGroups } from '../../redux/slices/groupsSlice';
import { getJobs } from '../../redux/actions/jobAction';
const Search = ( props) => {
    const [error, setError]= useState("");
    const input = props.match.params.input;
    const [privateData, setPrivateData]= useState("");
    const [courses] =useSelector(selectCourses);
    useEffect(() => {
        dispatch(getJobs());
      }, [dispatch]);
      const jobs = useSelector((state) => state.jobReducer.jobs);

    const [groups] =useSelector(selectGroups); 
    const [pages,setPages] =useSelector(selectPages);
   
    const [problems,setproblems] =useState([]);
    useEffect(() => {
        axios
          .get("https://aaweni.herokuapp.com/pi/postRoute/problem")
          .then((res) => setproblems(res.data.problems));
      }, []);
    const [users] =useSelector(selectUsers);

    
    const [posts,setPosts] =useState([]);

    const config = {
        headers: {
            "Content-Type":"appliation/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }

/**end users */

   /**get groups */
    
 

   /**end groups */


  /**get pages */







  /**end jobs */



    const dispatch = useDispatch();
    useEffect(() => async()=>{
 
      dispatch(getPosts());
    }, [dispatch]);

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


                <div class="lg:flex  lg:space-x-12">

                    <div class="lg:w-3/4">
                        

                        <div class="flex justify-between relative md:mb-4 mb-3">
                            <div class="flex-1">
                                <h2 class="text-3xl font-semibold"> {input} </h2>
                                <nav class="cd-secondary-nav border-b md:m-0 -mx-4">
                                    <ul uk-switcher="connect: #group-details; animation: uk-animation-fade">
                                        <li><a href="#" class="lg:px-2"> Users </a></li>
                                        <li><a href="#" class="lg:px-2"> Pages </a></li>
                                        <li><a href="#" class="lg:px-2"> Groups </a></li>
                                        <li><a href="#" class="lg:px-2"> Courses </a></li>
                                        <li><a href="#" class="lg:px-2"> Jobs </a></li>
                                        <li><a href="#" class="lg:px-2"> Problems </a></li>
                                    </ul>
                                </nav>
                            </div>
                          
                        </div>


                        <div class="divide-y">
                           <ul id="group-details" class="uk-switcher">

                           
                            {/**users */}
                            <li>
                            <div >
                            {users?.filter((val)=>{
                            if(input == ""){
                                return val
                            }else if (val.username.toLowerCase().includes(input.toLowerCase())){
                                return val
                            }
                        }).map((user,key)=>{
                       
                            return(
                    <div class="lg:flex lg:space-x-6 py-5" key={key}>
                           
                           <Link  to={`/userdetails/${user._id}`}>
                                    <div class="lg:w-60 w-full h-40 overflow-hidden rounded-lg relative shadow-sm"> 
                                         <img src={user.profilePicture} alt="" class="w-full h-full absolute inset-0 object-cover"/>
                                        
                                    </div>
                                    </Link>  
                                <div class="flex-1 lg:pt-0 pt-4"> 
                                <Link  to={`/userdetails/${user._id}`}>
                                    <a  class="text-xl font-semibold line-clamp-2">  {user.username}</a>
                              
                                  </Link>
        
                                </div>
                             
                            </div>
                      
                            )
                                  })} 
                            </div>
                            </li>
                          {/**pages */}
                          <li>
                          {pages?.filter((val)=>{
                            if(input == ""){
                                return val
                            }else if (val.name.toLowerCase().includes(input.toLowerCase())){
                                return val
                            }
                        }).map((page, i) => {
                                  return(
                              <div class="lg:flex lg:space-x-6 py-6"  key={i}>
                                
                                <Link  to={`/pagedetails/${page._id}`}>
                                    <div class="lg:w-60 w-full h-40 overflow-hidden rounded-lg relative shadow-sm"> 
                                         <img  src={`assets/uploads/${page.profilePicture}`} alt="" class="w-full h-full absolute inset-0 object-cover"/>
                                     
                                    </div>
                                    </Link>
                                <div class="flex-1 lg:pt-0 pt-4"> 
                                <Link  to={`/pagedetails/${page._id}`}>
                                    <a class="text-xl font-semibold line-clamp-2">  {page.name}</a>
                               </Link>
                                    <p class="line-clamp-2 pt-1"> {page.description} </p>
                                    
                                  
          
        
                                </div>
                            
                            </div>
                                  )
                                })}  
                          </li>

{/**end pages */}


                             {/**groups */}
                          <li>
                          { groups?.filter((val)=>{
                            if(input == ""){
                                return val
                            }else if (val.Name.toLowerCase().includes(input.toLowerCase())){
                                return val
                            }
                        }).map((group, i) => {
                                  return(
                              <div class="lg:flex lg:space-x-6 py-6"  key={i}>
                                <Link  to={`/group/${group._id}`}>
                                    <div class="lg:w-60 w-full h-40 overflow-hidden rounded-lg relative shadow-sm"> 
                                         <img src={group.photo} alt="" class="w-full h-full absolute inset-0 object-cover"/>
                                     
                                    </div>
                                </Link>
                                <div class="flex-1 lg:pt-0 pt-4"> 
                           
                                    <Link  to={`/group/${group._id}`} class="text-xl font-semibold line-clamp-2">  {group.Name}</Link>
                                    <p class="line-clamp-2 pt-1"> {group.Description} </p>
                                    
                                  
          
        
                                </div>
                            </div>
                                  )
                                })}  
                              </li>

                              {/**end groups */}
                       {/**course */}
                              <li>
                              { courses?.filter((val)=>{
                            if(input == ""){
                                return val
                            }else if (val.Name.toLowerCase().includes(input.toLowerCase())){
                                return val
                            }
                        }).map((cour, i) => {
                                  return(
                              <div class="lg:flex lg:space-x-6 py-6"  key={i}>
                                  
                                  <Link  to={`/detailcourse/${cour._id}`}>
                                    <div class="lg:w-60 w-full h-40 overflow-hidden rounded-lg relative shadow-sm"> 
                                         <img src={cour.Photo} alt="" class="w-full h-full absolute inset-0 object-cover"/>
                                     
                                    </div>
                                    </Link>
                                <div class="flex-1 lg:pt-0 pt-4"> 
                                <Link  to={`/detailcourse/${cour._id}`}>
                                    <a  class="text-xl font-semibold line-clamp-2">  {cour.Name}</a>
                                </Link>
                                    <p class="line-clamp-2 pt-1"> {cour.ShortDescription} </p>
                                    
                                  
          
        
                                </div>
                           
                            </div>
                                  )
                                })}  
                              </li>
                        {/**end course */}
                          

                          <li>
                          { jobs?.filter((val)=>{
                            if(input == ""){
                                return val
                            }else if (val.title.toLowerCase().includes(input.toLowerCase())){
                                return val
                            }
                        }).map((job, index) => {
                    return (<JobItem job={job} key={job._id}/>);
                  })}
                          </li>


                          <li>
                          {problems?.filter((val)=>{
                            if(input == ""){
                                return val
                            }else if (val.title.toLowerCase().includes(input.toLowerCase())){
                                return val
                            }
                        }).map((problem, index) => {
                    return (

                     
                        <div class="flex items-start pl-3 space-x-4">
                          <img
                            src={problem.username.profilePicture}
                            alt="share problem user"
                            class="w-16 h-16 rounded-full"
                          />
                          <div class="flex-1">
                            <h3 class="text-lg font-semibold line-clamp-1">{problem.title}</h3>
                            <p class="text-sm text-gray-400 mb-2">
                              Posted By: <span data-href="%40tag-dev.html">{problem.username?.username} </span>
                              <Moment fromNow>{problem.createdAt}</Moment>
                            </p>
                            <p class="leading-6 line-clamp-2">
                              <LinesEllipsis
                                text={problem.description}
                                maxLine="2"
                                ellipsis="..."
                                trimRight
                                basedOn="letters"
                              />
                            </p>
                          </div>
                          <div class="flex items-center space-x-4">
                            <ion-icon name="chatbubbles" class="text-3xl"></ion-icon>
                           
                          </div>
                        </div>
        
                  
                  



                    );
                  })}
                        </li>

                            </ul> 
                        </div>

                    </div>
                   </div>

        
            </div>
        </div>
    </body>
        </>
    );
};

export default Search;
