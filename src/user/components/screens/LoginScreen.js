import React,{useState , useEffect} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import "./screen.css";
import { GoogleLogin } from 'react-google-login';

/*const initialState = {
    email: '',
    password: '',
    err: ''
}*/

const LoginScreen = ({history}) =>{
   // const [user,setUser] = useState(initialState);
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [error, setError]= useState("");

    

    useEffect(() => {
        if(localStorage.getItem("authToken")){
            history.push("/");
        }
    }, [history]);

    const loginHandler = async (e) =>{
        e.preventDefault();
        const config = {
            header: {
                "Content-Type":"appliation/json"
            },
        };

        try {
            const {data} = await axios.post(
                "https://aaweni.herokuapp.com/api/auth/login", 
                {email, password},
                config);
            localStorage.setItem("authToken", data.token);
            history.push("/");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }


    const responseSuccessGoogle = async (response) => {
         const config = {
            header: {
                "Content-Type":"appliation/json"
            },
        };
         try {
            const {data} = await axios.post(
                'https://aaweni.herokuapp.com/api/auth/googlelogin',
                {tokenId: response.tokenId},
                config);
           
            localStorage.setItem("authToken", data.token)
            history.push("/")
        } catch (err) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }

    const responseErrorGoogle = async (response) => {
        
    }


    return(
    


    
            <body style={{background:"#f3f4f6",height:"650px"}}>
            <div id="wrapper" class="flex flex-col justify-between h-screen">
        
              
        <div class="bg-white py-4 shadow dark:bg-gray-800">
            <div class="max-w-6xl mx-auto">


                <div class="flex items-center lg:justify-between justify-around" style={{height:'30px'}}>

                    <a href="trending.html">
                        <img src="assets/user/images/logoo.png" alt="" class="w-32" style={{width: '80px'}}/>
                    </a>

                    <div class="capitalize flex font-semibold  lg:block my-2 space-x-3 text-center text-sm">
                    <Link to="/login">  <a href="form-login.html" class="py-3 px-4">Login</a> </Link>
                        <Link to="/register" style={{color:'white'}}>  <a href="javascript:void(0);" class="bg-blue-500 blue-500 px-6 py-3 rounded-md shadow text-white" >Register</a> </Link>
                    </div>

                </div>
            </div>
        </div>

     
        <div class="lg:p-12 max-w-xl lg:my-0 my-12 mx-auto p-6 space-y-" style={{width:'600px' }} >
                    <form onSubmit={loginHandler} class="lg:p-10 p-6 space-y-3 relative bg-white shadow-xl rounded-md">
                        <h1 class="lg:text-2xl text-xl font-semibold mb-6"> Login </h1>
                        
                        <div>
                            <label htmlFor="email" class="mb-0"> Email Address </label>
                            <input type="email" placeholder="Info@example.com" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} tabIndex={1} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        <div>
                            <label htmlFor="password" class="mb-0"> Password 
                            </label>
                            <input type="password" placeholder="******" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} tabIndex={2} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                            <Link to="/forgotpassword" tabIndex={4} style={{marginLeft:"120px"}}>Forgot Password?</Link>
                           
                           
                        </div>
                        {error && <span style={{color:'red'}}>{error}</span>}
                        <button type="submit" tabIndex={3} class="bg-blue-600 font-semibold p-2 mt-5 rounded-md text-center text-white w-full" >
                                Login</button>
                         
                    
                        <br/>
                        &nbsp; 
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        
                      
                        <GoogleLogin
                            clientId="978518760089-h0ncc4su74ie7jp6p4e6phm55fkg3r82.apps.googleusercontent.com"
                            buttonText="Login With Google"
                            onSuccess={responseSuccessGoogle}
                            onFailure={responseErrorGoogle}
                            cookiePolicy={'single_host_origin'}
                            style={{zIndex:50}}
                        />
                    </form>
                </div>
       
                <div class="page-content-inner " >

<div class="section-small text-md-left text-center" >
    <div class="uk-child-width-1-2@m uk-gird-large uk-flex-middle uk-grid" uk-grid="">
        <div class="uk-first-column">
            <img src="assets/user/course/images/feature.png"    alt=""/>
        </div>
        <div>
            <h2>Learn to code anytime <br/> and everywhere </h2>
                <p> Get started with just your name and your email adress . It’s as simple <br/> as
                    that
                    -- no payments or credit card information required. </p>
                    <Link to="/register" style={{color:'white'}}>   <a  class="bg-blue-600 font-semibold p-2 mt-5 rounded-md text-center text-white w-full"  >  Get started </a></Link>
                   
              
        </div>
    </div>
</div>

<br/>
<br/>
<div style={{background:"#f3f4f6" , minWidth:"1000px" , borderRadius:50}}>

<div class="section-small text-md-left text-center">
    <div class="uk-child-width-1-2@m uk-gird-large uk-flex-middle uk-grid" uk-grid="">
    <div >

            <h2 style={{marginLeft:"20px"}} >Meet our creative team </h2>
            <p class="u-custom-font u-text u-text-palette-1-dark-2 u-text-2" style={{marginLeft:"20px"}}>3aweni started in 2021 and launched on May 10, 2021.

Under the leadership <br/> of infinity Code, 3aweni operates a diverse business and generates revenue <br/> from user subscriptions, ad sales and recruiting solutions. </p>
                     
                    
              
        </div>
        <div class="uk-first-column">
             
            <div  style={{display:'flex'}}>
        <img  class="bg-gray-200 border border-white rounded-full w-25 h-25" src="https://res.cloudinary.com/espritnn/image/upload/v1621109934/183499149_403187637312596_8326271803110206255_n_nwwxgf.jpg" alt=""/>
        &nbsp;
        &nbsp;
        &nbsp;
    
        <img  class="bg-gray-200 border border-white rounded-full w-25 h-25" src="https://res.cloudinary.com/espritnn/image/upload/v1621109365/127196987_3185033435056451_1514485546323413250_n_vkz6xy.jpg" alt=""/>
        &nbsp;
        &nbsp;
        &nbsp;
    
        <img   class="bg-gray-200 border border-white rounded-full w-25 h-25" src="https://res.cloudinary.com/espritnn/image/upload/v1621109204/48364812_2219564104968685_7310774790153830400_n_cwlsia.jpg" alt=""/>
   
        </div>
      
       
       
        <div  style={{display:'flex'}}>
        <img   style={{marginLeft:"80px" , marginTop:"-10px"}}class="bg-gray-200 border border-white rounded-full w-25 h-25" src="https://res.cloudinary.com/espritnn/image/upload/v1621109329/186908585_5719273008112958_8870420509529740652_n_gmupvz.png" alt=""/>
        &nbsp;
        &nbsp;
        &nbsp;
      
             
   <img  style={{  marginTop:"-10px"}} class="bg-gray-200 border border-white rounded-full w-25 h-25" src="https://res.cloudinary.com/espritnn/image/upload/v1621109336/82490279_2740873609284983_3568013234696880128_n_xlci9t.jpg" alt=""/>
   </div>


       
    </div>
     
    </div>
</div>


</div>
<br/>
<br/>
        <div class="lg:mb-5 py-3 uk-link-reset"  class="bg-gray-100">
            <div class="flex flex-col items-center justify-between lg:flex-row max-w-6xl mx-auto lg:space-y-0 space-y-3">
                <div class="flex space-x-2 text-gray-700 uppercase">
                    <a> 3awenii@gmail.com </a>
                    <a href="#"> </a>
                    <a href="#"> </a>
                    <a href="#"> </a>
                </div>
                <p class="capitalize"> © copyright 2021 by Infinity Code</p>
            </div>
        </div>

    </div>
    </div>  
            </body>
        
    )
}

export default LoginScreen;

