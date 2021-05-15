import React,{useState , useEffect} from 'react';
import axios from 'axios';
import Header from '../Header';
import { useDispatch ,useSelector} from 'react-redux';
import {fetchconnectuser,selectoneuser,selectSessionUser} from "../../../redux/slices/userSlice";
import AddPost from '../Post/AddPost';
import PostItem from '../Post/PostItem';
import { deletePost, getPosts } from "../../../redux/actions/postAction";
const PrivateScreen = ({history}) => {
    const [error, setError]= useState("");
    const [privateData, setPrivateData]= useState("");


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
          </div>
        </div>
      </div>
    </body>
        </>
    );
};

export default PrivateScreen;
