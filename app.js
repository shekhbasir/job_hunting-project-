const express=require('express');
const app=express();
const cors=require('cors');
const cooiesparser=require('cookie-parser');
const path=require('path');
require('dotenv').config({});
const Dbconnect=require('./config/Dbcon');
const {signupkam,loginkam, logoutkam, updatekam}=require('./routes/sarauser');
const { 
  hamarcomp,
  hamarsabcompany,
  hamarsinglecompany,
  hamarupdatecompany,
  hamardeletecompany
} = require('./routes/saracompany');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials:true
}))


//this is for the another jobs simply 
app.use(cooiesparser());
app.use(signupkam);
app.use(loginkam);
app.use(logoutkam);
app.use(updatekam);

//this is for the company jobs smply 
app.use(hamarcomp);
app.use(hamarsabcompany);
app.use(hamarsinglecompany);
app.use(hamarupdatecompany);
app.use(hamardeletecompany);
//now here i am simply going to calling this here and working simply and then it's will going to work
const PORT=process.env.PORT||8000;
app.listen(PORT,()=>{
Dbconnect();
  console.log(`this is the link http://localhost:${PORT}`);
})