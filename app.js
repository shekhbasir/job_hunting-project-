const express=require('express');
const app=express();
const cors=require('cors');
const cooiesparser=require('cookie-parser');
const path=require('path');
require('dotenv').config({});
const Dbconnect=require('./config/Dbcon');
const {signupkam,loginkam}=require('./routes/sarauser');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin:'http//localhost:5173',
  credentials:true
}))
app.use(cooiesparser());
app.use(signupkam);
app.use(loginkam);


const PORT=process.env.PORT||8000;
app.listen(PORT,()=>{
Dbconnect();
  console.log(`this is the link http://localhost:${PORT}`);
})