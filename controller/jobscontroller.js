const jobSchema = require('../models/job');

// ------------------- CREATE JOB -------------------
const creatingjobs = async (req, res) => {
  try {
    const { title, description, requirement, salary, location, job_Types, position, company } = req.body;

    if (!title || !description || !requirement || !location || !position || !company) {
      return res.status(400).json({
        message: "something is missing ...",
        success: false
      });
    }

    const jobsdata = await jobSchema.create({
      title,
      description,
      requirement: requirement.split(","),
      location,
      salary,
      job_Types,
      position,
      createdBy: req.userid,          // <-- FIX: req.userid / req._id wrong
      company: company            // <-- FIX: company should come from body
    });

    return res.status(200).json({
      message: "congratulation your jobs will created successfully..",
      jobsdata,
      success: true
    });

  } catch (error) {
    return res.status(400).json({
      message: "error from the job creation ",
      error_resone: error.message,
      success: false
    });
  }
};


// ------------------- GET ALL JOBS -------------------
const getalljobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },        // <-- FIX: $option → $options
        { description: { $regex: keyword, $options: "i" } }
      ]
    };

    const sabjobs = await jobSchema.find(query).populate({
      path:"company",
    });

    if (sabjobs.length === 0) {       // <-- FIX: empty array check
      return res.status(400).json({
        message: "No Jobs Found ...",
        success: false
      });
    }

    return res.status(200).json({
      message: "This Is The all Data ",
      sabjobs,
      success: true
    });

  } catch (error) {
    return res.status(400).json({
      message: "error  from the getingall jobs ",
      error_types: error.message,
      success: false
    });
  }
};


// ------------------- GET SINGLE JOB -------------------
const getjobsforcompany = async (req, res) => {
  try {
    const jobid = req.params.id;

    const jobsdata = await jobSchema.findById(jobid);

    if (!jobsdata) {
      return res.status(400).json({
        message: "No Jobs found ..",
        sucess: false,
      });
    }

    return res.status(200).json({
      message: "The Jobs posted by single compony ...",
      jobsdata,
      success: true,
    });

  } catch (error) {
    return res.status(400).json({
      message: "erorr from the finding jobs by single company ",
      error_types: error.message,
      sucess: false,
    });
  }
};


// ------------------- GET ADMIN JOBS -------------------
const getadminjobs = async (req, res) => {
  try {
    const adminid = req.userid;     // <-- FIX: req.id should be used

    const sabjobs = await jobSchema.find({ createdBy: adminid });

    if (sabjobs.length === 0) {  // <-- FIX
      return res.status(400).json({
        message: "Noo Jobs created By this Admin ..",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Admin Jobs is Given Below",
      sabjobs,
      success: true,
    });

  } catch (error) {
    return res.status(400).json({
      message: "Error from the admin jobs portall ",
      error_types: error.message,
      success: false,
    });
  }
};


module.exports = {
  creatingjobs,
  getalljobs,
  getjobsforcompany,
  getadminjobs
};


//abb simply hamni ke okar kaam kar saktani san with routes mee dal kee  