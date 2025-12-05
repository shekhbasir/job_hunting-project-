const mongoose=require('mongoose');
const Userschema=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookie=require

const usersignup=async (req,res)=>{
  try{
    //here sab se pahle sara data lewele 
    const {fullname,email,phone_Number,password,role}=req.body;
    if(!fullname||!email||!phone_Number||!password||!role){
      return res.status(400).json({
        message:"There Is SomeThing Missing ..",
        success:false,
      })
    }

    //now i am checking it exist 
    const Existuser=await Userschema.findOne({email});

    if(Existuser){
      return res.status(400).json({
        message:"Emial Already Exist",
        success:false,
      });
    };

    //now i am going to hash the password and using this password simply 

    const hashpassword=await bcrypt.hash(password,10);

    //now creating the new user
    const newUser=await Userschema.create({
      fullname:fullname,
      email:email,
      password:hashpassword,
      phone_Number:phone_Number,
      role:role
    })
    return res.status(200).json({message:"You Signing the code Successfully ....",
      userDetails:{
        id:newUser._id,
        name:newUser.fullname,
        email:email,
      password:hashpassword,
      phone_Number:phone_Number,
      role:role
      }
    });


  }catch(error){
    console.log(`this is the error from usercontroller`,error.message);

  }
}


const userlogin=async (req,res) =>{
  try{
    const{email,password,role}=req.body;

    if(!email|| !password||!role){
      return res.status(400).json({
        message:"Something is Missing ",
        success:false,
      })
    };

    let user=await Userschema.findOne({email});
    user.password = undefined;
    if(!user){
      return res.status(400).json({
        message:"Invalid Email..",
        success:false,
      })
    };

    const matchpass=await bcrypt.compare(password,user.password);
    if(!matchpass){
      return res.status(400).json({message:"password not Match ..",success:false});
    }

    const token=jwt.sign({userid:user._id},process.env.SECRET_KEY,{expiresIn:"2d"})

    //now abb hamini ke simply apan jobs kar saktani san and by the help  of this

    user={
      userid:user._id,
      fullname:user.fullname,
      email:user.email,
      phone_Number:user.phone_Number,
      role:user.role

    }

    //now i am going to generating the cookies 

    return res.status(200).cookie('token',token,{httpOnly:true,maxAge:1*24*60*60*1000}).json({message:`welcome back ${user.fullname}`,
    user:user,success:true});


  }catch(error){

    // console.log("the error from the login ",error.message);
    console.log("Signup error:", error.message);
    return res.status(400).json({message:`this is the error from login controller ${error.message}`})

  }
}


module.exports={usersignup,userlogin}