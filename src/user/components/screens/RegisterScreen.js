import React,{useState, useEffect} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import "./screen.css";


const RegisterScreen = ({history}) =>{

    const [username, setUsername]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    const [error, setError]= useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken")){
            history.push("/");
        }
    }, [history]);

    const registerHandler = async (e) =>{
        e.preventDefault();
        const config = {
            header: {
                "Content-Type":"appliation/json"
            }
        }

        if(password !== confirmPassword){
            setPassword("");
            setConfirmPassword("");
            setTimeout(() =>{
                setError("")
            }, 5000);
            return setError("Passwords do not match")
        }

        try {
            const {data} = await axios.post(
                "https://aaweni.herokuapp.com/api/auth/register", 
                {username, email, password},
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

    return(
            <body style={{background:"#f3f4f6",height:"850px"}}>
                <div class="bg-white py-4 shadow dark:bg-gray-800">
            <div class="max-w-6xl mx-auto">


                <div class="flex items-center lg:justify-between justify-around" style={{height:'30px'}}>

                    <a href="trending.html">
                        <img src="assets/user/images/logoo.png" alt="" class="w-32" style={{width: '80px'}}/>
                    </a>

                    <div class="capitalize flex font-semibold  lg:block my-2 space-x-3 text-center text-sm">
                    <Link to="/login">  <a href="javascript:void(0);" class="py-3 px-4">Login</a> </Link>
                        <Link to="/register" style={{color:'white'}}>  <a href="javascript:void(0);" class="bg-blue-500 blue-500 px-6 py-3 rounded-md shadow text-white" >Register</a> </Link>
                    </div>

                </div>
            </div>
        </div>
                <div class="lg:p-12 max-w-xl lg:my-0 my-12 mx-auto p-6 space-y-">
                    <form onSubmit={registerHandler} class="lg:p-10 p-6 space-y-3 relative bg-white shadow-xl rounded-md">
                        <h1 class="lg:text-2xl text-xl font-semibold mb-6"> Register </h1>
                        
                        <div>
                            <label htmlFor="name" class="mb-0"> Username </label>
                            <input type="text" placeholder="Username" id="name" required value={username} onChange={(e) => setUsername(e.target.value)} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        <div>
                            <label htmlFor="email" class="mb-0"> Email Address </label>
                            <input type="email" placeholder="Info@example.com" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        <div>
                            <label htmlFor="password" class="mb-0"> Password </label>
                            <input type="password" placeholder="******" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        <div>
                            <label htmlFor="confpassword" class="mb-0"> Confirm Password </label>
                            <input type="password" placeholder="******" id="confpassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        {error && <span style={{color:'red'}}>{error}</span>}
                        <div>
                            <button type="submit" class="bg-blue-600 font-semibold p-2 mt-5 rounded-md text-center text-white w-full">
                                Register</button>
                        </div>
                     
                    </form>


                </div>
            </body>
    )
}

export default RegisterScreen;
