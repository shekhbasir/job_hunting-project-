//now i am going to Handle this in thins router and handle this 
const express=require('express');
const signupkam=express.Router();
const loginkam=express.Router();
const logoutkam=express.Router();
const updatekam=express.Router();
const isauth=require('../middleware/isauth');
const {usersignup,userlogin,userlogout,profileupdate}=require('../controller/usercontrol');

signupkam.post('/signup',usersignup);
// userlogin.post('/login',userlogin);
loginkam.post('/login',userlogin);

logoutkam.get('/logout',userlogout);

updatekam.put('/profileupdate',isauth,profileupdate);

//simply i am going to making the routes for handling the upadte 


module.exports={signupkam,loginkam,logoutkam,updatekam};