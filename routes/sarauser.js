//now i am going to Handle this in thins router and handle this 
const express=require('express');
const signupkam=express.Router();
const loginkam=express.Router();
const {usersignup,userlogin}=require('../controller/usercontrol');

signupkam.post('/signup',usersignup);
// userlogin.post('/login',userlogin);
loginkam.post('/login',userlogin);


module.exports={signupkam,loginkam};