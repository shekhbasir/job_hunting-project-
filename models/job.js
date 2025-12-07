//here i am going to creating the schema for the jobs 

const mongoose=require('mongoose');

const Jobschema1=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true,
  },
  requirment:[{type:String}],
  salary:{type:Number},
  location:{type:String,required:true},
  job_Types:{type:String},
  position:{type:Number,require:true},
  

  company:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Company",
    required:true,
  },

  createdBy:{
     type:mongoose.Schema.Types.ObjectId,
    ref:"Userschema",
    required:true,

  },
  application:[{
     type:mongoose.Schema.Types.ObjectId,
    ref:"application",
  }]
})

module.exports=mongoose.model("jobSchema",Jobschema1);