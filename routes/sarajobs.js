const express = require('express');
const router = express.Router();

const { creatingjobs, getalljobs, getjobsforcompany, getadminjobs } = require('../controller/jobscontroller');
const isauth=require('../middleware/isauth');

router.post('/createjobs',isauth,creatingjobs);
router.get('/getalljob',isauth, getalljobs);
router.get('/getjobswithcompany/:id',isauth, getjobsforcompany);
router.get('/adminjobs',isauth,getadminjobs);

module.exports = router;
