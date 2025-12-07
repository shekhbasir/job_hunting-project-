const Application = require("../models/application");
const jobSchema = require("../models/job");

// ---------------- APPLY JOB ----------------
const applyjob = async (req, res) => {
  try {
    const userid = req.userid;
    const jobid = req.params.id;

    if (!jobid) {
      return res.status(400).json({
        message: "Job Id is required",
        success: false,
      });
    }

    const existing = await Application.findOne({
      job: jobid,
      applicant: userid,
    });

    if (existing) {
      return res.status(400).json({
        message: "You already applied for this job",
        success: false,
      });
    }

    const job = await jobSchema.findById(jobid);
    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    const newApp = await Application.create({
      job: jobid,
      applicant: userid,
    });

    job.application.push(newApp._id);
    await job.save();

    return res.status(201).json({
      message: "Job Applied Successfully",
      application: newApp,
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error applying for job",
      error: error.message,
      success: false,
    });
  }
};

// ---------------- GET APPLIED JOBS BY USER ----------------
const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.userid;

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      });

    if (!application || application.length === 0) {
      return res.status(404).json({
        message: "No Applications Found",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching applied jobs",
      error: error.message,
      success: false,
    });
  }
};

// ---------------- GET APPLICANTS FOR JOB (ADMIN) ----------------
const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const applicants = await Application.find({ job: jobId })
      .sort({ createdAt: -1 })
      .populate({
        path: "applicant",
        populate: { path: "profile" },
      })
      .populate({
        path: "job",
        populate: { path: "company" },
      });

    if (!applicants || applicants.length === 0) {
      return res.status(404).json({
        message: "No applicants found",
        success: false,
      });
    }

    return res.status(200).json({
      applicants,
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching applicants",
      error: error.message,
      success: false,
    });
  }
};

// ---------------- UPDATE STATUS ----------------
const updateStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    const validStatus = ["pending", "shortlisted", "rejected", "hired"];

    if (!status || !validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
        success: false,
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({
      message: "Status Updated",
      application,
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error updating status",
      error: error.message,
      success: false,
    });
  }
};

module.exports = {
  applyjob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
};


//lets i am going to making the jobs simply 