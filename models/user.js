//here i  am going to making  the user schema 

const mongoose=require('mongoose');

const userSchema1=new mongoose.Schema({
  fullname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  phone_Number:{
    type:Number,
    required:true,
  },
  password:{
    type:String,
    required:true,

  },
  role:{
    type:String,
    enum:['student','recruiter'],
    required:true
  },

  profile:{
    bio:{
      type:String,
    },
    skill:[{type:String}],
    resume:{type:String},
    resumeoriginname:{type:String},
    company:{type:mongoose.Schema.Types.ObjectId,ref:"Company"},
    profilephoto:{
      type:String,
      default:"",
    },
  }
},{timestamps:true});

module.exports=mongoose.model("Userschema",userSchema1);