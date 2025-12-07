//this is the routes for thhe 
const express=require('express');
const hamarcomp=express.Router();
const hamarsabcompany=express.Router();
const hamarsinglecompany=express.Router();
const hamarupdatecompany=express.Router();
const hamardeletecompany=express.Router();
const {CompanyRegister,getallcompany,getsinglecompany,updatecompany,deletetingcompany}=require('../controller/companycontrol');
const isauth = require('../middleware/isauth');
//e kam  tab hoi jab user already login rahi tab

hamarcomp.post('/companyregister',isauth,CompanyRegister);
hamarsabcompany.get('/saracompany',isauth,getallcompany);
hamarsinglecompany.get('/singlecompany/:id',isauth,getsinglecompany);
hamarupdatecompany.post('/updatecompany/:id',isauth,updatecompany);
hamardeletecompany.delete('/deletecompany/:id',isauth,deletetingcompany);
module.exports={hamarcomp,hamarsabcompany,hamarsinglecompany,hamarupdatecompany,hamardeletecompany
}

//now by the help of the another compnay


