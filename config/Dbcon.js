const mongoose=require('mongoose');

const Dbconnect=async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Data Base Connected Succefully ...");
  }catch(error){
    console.log('Failed to connect With The database')
  }
}
 module.exports=Dbconnect;