const Company = require('../models/company');


const CompanyRegister = async (req, res) => {
  try {
    const { CompanyName, location ,description,website,logo} = req.body;

    if (!CompanyName || !location) {
      return res.status(400).json({
        message: "Company name and location are required",
        success: false
      });
    }

    const exists = await Company.findOne({ CompanyName });
    if (exists) {
      return res.status(400).json({
        message: "This company is already registered",
        success: false
      });
    }

    const newCompany = await Company.create({
      CompanyName,
      location,
      description,
      website,logo,
      userId: req.userid
    });

    return res.status(200).json({
      message: "Company registered successfully",
      company: newCompany,
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error registering company",
      error: error.message
    });
  }
};


// GET ALL COMPANIES OF LOGGED-IN USER
const getallcompany = async (req, res) => {
  try {
    const userid = req.userid;
    const companies = await Company.find({ userId: userid });

    return res.status(200).json({
      companies,
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error getting companies",
      error: error.message
    });
  }
};



// GET SINGLE COMPANY
const getsinglecompany = async (req, res) => {
  try {
    const companyid = req.params.id;

    const company = await Company.findById(companyid);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "Company found",
      company,
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error getting company",
      error: error.message
    });
  }
};



// UPDATE COMPANY
const updatecompany = async (req, res) => {
  try {
    const companyid = req.params.id;
    const { CompanyName, location, website, description } = req.body;

    const updateData = { CompanyName, location, website, description };

    const updatedCompany = await Company.findByIdAndUpdate(
      companyid,
      updateData,
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({
        message: "Company not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      updatedCompany
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error updating company",
      error: error.message
    });
  }
};



// DELETE COMPANY
const deletetingcompany = async (req, res) => {
  try {
    const companyid = req.params.id;

    const deleted = await Company.findByIdAndDelete(companyid);

    if (!deleted) {
      return res.status(404).json({
        message: "Company not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "Company deleted successfully",
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error deleting company",
      error: error.message
    });
  }
};



module.exports = {
  CompanyRegister,
  getallcompany,
  getsinglecompany,
  updatecompany,
  deletetingcompany
};
