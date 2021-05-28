import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPosts } from "../../../redux/actions/postAction";
import AddPost from "./AddPost";
import PostItem from "./PostItem";
import Header from'../Header';
/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Posts() {
  /* const [posts, setposts] = useState([]);

  useEffect(() => {
    axios.get("https://aaweni.herokuapp.com/pi/postRoute/post").then((res) => setposts(res.data.posts));
  }, []);
  console.log(posts);*/

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  const posts = useSelector((state) => state.postReducer.posts);

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
                      <li class="uk-active"><a class="active" href="#0">  Friends  <span> 310 </span> </a></li>
                      <li><a href="#0">Groups</a></li>
                  </ul>
              </nav>
  
              <div class="contact-list">
  
                  <a href="#">
                      <div class="contact-avatar">
                          <img src="assets/images/avatars/avatar-1.jpg" alt=""/>
                          <span class="user_status status_online"></span>
                      </div>
                      <div class="contact-username"> Dennis Han</div>
                  </a>
                  <div uk-drop="pos: left-center ;animation: uk-animation-slide-left-small">
                      <div class="contact-list-box">
                          <div class="contact-avatar">
                              <img src="assets/images/avatars/avatar-2.jpg" alt=""/>
                              <span class="user_status status_online"></span>
                          </div>
                          <div class="contact-username">   Dennis Han</div>
                          <p> 
                              <ion-icon name="people" class="text-lg mr-1"></ion-icon> Become friends with 
                              <strong> Stella Johnson </strong> and <strong> 14 Others</strong>
                          </p>
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
  
                  <a href="#">
                      <div class="contact-avatar">
                          <img src="assets/images/avatars/avatar-2.jpg" alt=""/>
                          <span class="user_status"></span>
                      </div>
                      <div class="contact-username"> Erica Jones</div>
                  </a>
                  <div uk-drop="pos: left-center ;animation: uk-animation-slide-left-small">
                      <div class="contact-list-box">
                          <div class="contact-avatar">
                              <img src="assets/images/avatars/avatar-1.jpg" alt=""/>
                              <span class="user_status"></span>
                          </div>
                          <div class="contact-username">  Erica Jones </div>
                          <p> 
                              <ion-icon name="people" class="text-lg mr-1"></ion-icon> Become friends with 
                              <strong> Stella Johnson </strong> and <strong> 14 Others</strong>
                          </p>
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
                  <a href="timeline.html">
                      <div class="contact-avatar">
                          <img src="assets/images/avatars/avatar-5.jpg" alt=""/>
                          <span class="user_status status_online"></span>
                      </div>
                      <div class="contact-username">Stella Johnson</div>
                  </a>
                  <a href="timeline.html">
                      <div class="contact-avatar">
                          <img src="assets/images/avatars/avatar-6.jpg" alt=""/>
                      </div>
                      <div class="contact-username"> Alex Dolgove</div>
                  </a>
                  
                  <a href="timeline.html">
                      <div class="contact-avatar">
                          <img src="assets/images/avatars/avatar-1.jpg" alt=""/>
                          <span class="user_status status_online"></span>
                      </div>
                      <div class="contact-username"> Dennis Han</div>
                  </a>
                  <a href="timeline.html">
                      <div class="contact-avatar">
                          <img src="assets/images/avatars/avatar-2.jpg" alt=""/>
                          <span class="user_status"></span>
                      </div>
                      <div class="contact-username"> Erica Jones</div>
                  </a>
                  <a href="timeline.html">
                      <div class="contact-avatar">
                          <img src="assets/images/avatars/avatar-7.jpg" alt=""/>
                      </div>
                      <div class="contact-username">Stella Johnson</div>
                  </a>
                  <a href="timeline.html">
                      <div class="contact-avatar">
                          <img src="assets/images/avatars/avatar-4.jpg" alt=""/>
                      </div>
                      <div class="contact-username"> Alex Dolgove</div>
                  </a>
  
  
              </div>
  
  
          </div>
          </div>
         
         
          </div>
          </div>
          </div>
    </body>
  );
}
