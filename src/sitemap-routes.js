import React from 'react';
import { Route, Redirect } from 'react-router';
import ForgotPasswordScreen from './user/components/screens/ForgotPasswordScreen';
import LoginScreen from './user/components/screens/LoginScreen';
import PrivateScreen from './user/components/screens/PrivateScreen';
import RegisterScreen from './user/components/screens/RegisterScreen';
import ResetPasswordScreen from './user/components/screens/ResetPasswordScreen';
import EditProfileScreen from './user/components/screens/profile/EditProfileScreen';




export default (
	<Route>
	         <Route exact path="/login" component={LoginScreen}/>
           <Route exact path="/forgotpassword" component={ForgotPasswordScreen}/>
           <Route exact path="/register" component={RegisterScreen}/>
		   <Route exact path="/api/auth/resetpassword/:token" component={ResetPasswordScreen}/>
		   <Route exact path="/" component={PrivateScreen}/>
		   <Route exact path="/edit_info_user" component={EditProfileScreen}/> 
		
		  
	</Route>
);
