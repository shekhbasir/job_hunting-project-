const express = require("express");
const router1 = express.Router();
const isauth = require("../middleware/isauth");

const {
  applyjob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
} = require('../controller/applicationcontrol');

router1.post("/applyjob/:id", isauth, applyjob);
router1.get("/appliedjobs", isauth, getAppliedJobs);
router1.get("/applicants/:id", isauth, getApplicants);
router1.put("/updatestatus/:id", isauth, updateStatus);

module.exports = router1;
