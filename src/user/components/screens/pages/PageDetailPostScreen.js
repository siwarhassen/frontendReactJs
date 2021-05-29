import React ,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import { Card,Button,Accordion,ListGroup } from 'react-bootstrap';
import AddPost from "./AddPost";
import PostItem from "../../Post/PostItem";
import { useDispatch } from 'react-redux';
import { getPosts } from '../../../../redux/actions/postAction';
import { useSelector } from 'react-redux';
const PageDetailPostScreen = ({history,match}) =>{
    const [page, setPage]= useState(Object);
    const [number, setNumber]= useState(0);
    const [users, setUsers]= useState([]);
    const [followers_page,setFollowers_page] = useState([]);
    const [etat, setEtat]= useState('Join');
    const [user, setUser]= useState(Object);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getPosts());
    }, [dispatch]);
  
    const posts = useSelector((state) => state.postReducer.posts.filter((post) => post.page === match.params.id));
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

                const id = match.params.id;

                
                    axios.get(`https://aaweni.herokuapp.com/followpage/getAll`, config)
                .then((response) => {
                    setFollowers_page(response.data);
                console.log(response.data)
                })
                .catch((error) => {
                console.log(error)
                })
        
                for (let i of followers_page){
                    if(i.PageId === id){
                        setEtat('Unjoin')
                    }else{
                        setEtat('Join')
                    }
                }
                

                axios.get(`https://aaweni.herokuapp.com/page/details/${id}`, config)
                  .then((response) => {
                   setPage(response.data);
                   console.log(page)
                  })
                  .catch((error) => {
                    console.log(error)
                  })

                  /** connected user details */

                axios.get(`https://aaweni.herokuapp.com/api/auth/details_user`, config)
                .then((response) => {
                    setUser(response.data.data);
                 console.log(user)
                })
                .catch((error) => {
                  console.log(error)
                })

                  axios.get(`https://aaweni.herokuapp.com/followpage/numbers/${id}`, config)
                .then((response) => {
                    setNumber(response.data);
                console.log(response.data)
                })
                .catch((error) => {
                console.log(error)
                })

                axios.get(`https://aaweni.herokuapp.com/followpage/get/${id}`, config)
                .then((response) => {
                    setUsers(response.data);
                console.log(response.data)
                })
                .catch((error) => {
                console.log(error)
                })
    
                
            }
           
    ,[history,etat,page]);

    const inviHandler = async () => {
        const id = match.params.id;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
          if (etat=='Join'){
            axios.post(`https://aaweni.herokuapp.com/followpage/add/${id}`,{},{
                headers: headers
              })
              .then((response) => {
               console.log(response.data.data);
               
              })
              .catch((error) => {
                console.log(error)
              })

             /* axios.post(`/notif/add/${page.UserId}`,{body:`${user.username} have joined the page ${page.name} `,title:"new invitation"}, {
                headers: headers
              })
              .then((response) => {
               console.log(response.data.data);
               
              })
              .catch((error) => {
                console.log(error)
              })*/
    
          }else if(etat=='Unjoin'){
            setEtat('Join')
            axios.get(`/followpage/getAll`, {
                headers: headers
              })
            .then((response) => {
                setFollowers_page(response.data);
            console.log(response.data)
            })
            .catch((error) => {
            console.log(error)
            })
    
            for (let i of followers_page){
                if(i.PageId === id){
                   axios.delete(`https://aaweni.herokuapp.com/followpage/delete/${i._id}`, {
                    headers: headers
                  })
                  .then((response) => {
                  })
                  .catch((error) => {
                    console.log(error)
                  })
                }
            }

          /*  axios.post(`https://aaweni.herokuapp.com/notif/add/${page.UserId}`,{body:`${user.username} have unjoined the page ${page.name} `,title:"new invitation"}, {
                headers: headers
              })
              .then((response) => {
               console.log(response.data.data);
               
              })
              .catch((error) => {
                console.log(error)
              })*/
          }
         

        }

    return (
        <>
        <Header/>
    <body>
    <div id="wrapper">
    <div class="main_content">
            <div class="mcontainer">
            <div class="profile is_group bg-white rounded-2xl -mt-4">

                    <div class="profiles_banner">
                        <img src={`assets/uploads/${page.coverPicture}`} alt=""/>
                    </div>
                    <div class="profiles_content">
                        <div class="profile_avatar">
                            <div class="profile_avatar_holder"> 
                                <img src={`assets/uploads/${page.profilePicture}`} alt=""/>
                            </div>
                            <div class="icon_change_photo" hidden> <ion-icon name="camera" class="text-xl"></ion-icon> </div>
                        </div>
                        <div class="profile_info">
                            <h1> {page.name} </h1>
                            <p> Public page ·  {number} members</p>
                        </div>
                        <div class="flex items-center space-x-4">
                        { users.map((val,key) => {
                                    return(
                                <div key={key}>
                            <div class="flex items-center -space-x-4">
                                <img src={val?.profilePicture} alt="" class="w-10 h-10 rounded-full border-2 border-white"/>
                                
                            </div>
                            </div>
                                    )})}
                            <button onClick={inviHandler} class="flex items-center justify-center h-9 px-5 rounded-md bg-blue-600 text-white  space-x-1.5">
                                <ion-icon name="thumbs-up"></ion-icon>
                                <span> {etat} </span>
                            </button>
                        </div>

                    </div>

                    <nav class="cd-secondary-nav border-t -mb-0.5 lg:pl-2">
                        <ul>
                        <li class="active"><Link to={`/pagedetailsposts/${page._id}`} >Home</Link></li>
                            <li ><Link to={`/pagedetails/${page._id}`} >About</Link></li>
                            <li><Link to={`/pagefollowersdetails/${page._id}`}>Followers</Link></li>
                            
                        </ul>
                    </nav>
                </div>
<br></br>

<div class="space-y-5 flex-shrink-0 lg:w-7/12" style={{marginLeft:"150px"}}>
                  <AddPost pageid={match.params.id}></AddPost>
                  {posts.map((post) => {
                    return <PostItem post={post} key={post._id}></PostItem>;
                  })}
                </div>
               {/**     <Card className="text-center">
                        
                        <Card.Body>
                            <Card.Title>Page Description</Card.Title>
                            <Card.Text>
                                    {page.description}
                            </Card.Text>
                            
                        </Card.Body>
                    </Card>*/} 
                    <br></br>
                  
            </div>
    
           

    </div>
    </div>
    </body>
    </>
    )}

export default PageDetailPostScreen;
