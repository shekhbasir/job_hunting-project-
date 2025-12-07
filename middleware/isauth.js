const express=require('express');
const jwt=require('jsonwebtoken');
const isauth=async (req,res,next) =>{
  try{
    const token=req.cookies.token;
    if(!token){
      return res.status(400).json({
        message:"First Go And Login",
      success:false,
      });
    }


    const decoded=jwt.verify(token,process.env.SECRET_KEY);
    if(!decoded){
      return res.status(401).json({
        message:"INvalid Token",
        success:true
      })
    }
     req.userid = decoded.userid;
    next();

  }catch(error){
    return res.status(400).json({
      message:"Invalid Token",
      success:false
    });
  }
}
module.exports=isauth;