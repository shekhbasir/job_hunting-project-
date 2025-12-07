//here i am going to making the schema for the company

const mongoose=require('mongoose');

const appschema=new mongoose.Schema({
  job:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"jobSchema",
    required:true,
  },

  applicant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Userschema",
    required:true,

  },
  status:{
    type:String,
    enum:["pending", "shortlisted", "rejected", "hired"],
    default:"pending"
  }
},{timestamps:true});

module.exports=mongoose.model('Application',appschema);