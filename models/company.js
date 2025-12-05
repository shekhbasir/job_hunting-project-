//here i am going to making the schema for the compay
const mongoose=require('mongoose');

const companySchema1=new mongoose.Schema({
  name:{
    type:String,
    unique:true,
    required:true
  },
  description:{
    type:String,
  },
  website:{
    type:String,
  },
  location:{
    type:String
  },
  logo:{
    type:String,
    required:true,
    default: ""
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Userschema"
  }
},{timestamps:true});
module.exports=mongoose.model("Company",companySchema1);