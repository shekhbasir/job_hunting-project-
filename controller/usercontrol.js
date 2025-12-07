const mongoose = require("mongoose");
const Userschema = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require;

const usersignup = async (req, res) => {
  try {
    const { fullname, email, phone_Number, password, role } = req.body;
    if (!fullname || !email || !phone_Number || !password || !role) {
      return res.status(400).json({
        message: "There Is SomeThing Missing ..",
        success: false,
      });
    }

    const Existuser = await Userschema.findOne({ email });

    if (Existuser) {
      return res.status(400).json({
        message: "Emial Already Exist",
        success: false,
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = await Userschema.create({
      fullname: fullname,
      email: email,
      password: hashpassword,
      phone_Number: phone_Number,
      role: role,
    });
    return res
      .status(200)
      .json({ message: "Account Created Succesfully ..", success: true });
  } catch (error) {
    console.log(`this is the error from usercontroller`, error.message);
  }
};

const userlogin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await Userschema.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
        success: false,
      });
    }

    const matchpass = await bcrypt.compare(password, user.password);

    if (!matchpass) {
      return res.status(400).json({
        message: "Password does not match",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Role is not valid for this user",
        success: false,
      });
    }

    user.password = undefined;

    const token = jwt.sign({ userid: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    const userdata = {
      userid: user._id,
      fullname: user.fullname,
      email: user.email,
      phone_Number: user.phone_Number,
      role: user.role,
    };

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: userdata,
        success: true,
      });
  } catch (error) {
    console.log("Login error:", error.message);
    return res.status(400).json({
      message: `this is the error from login controller ${error.message}`,
    });
  }
};

const userlogout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "You Logout Successfull",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failled To Logout ..",
      resone: error.message,
    });
    console.log(error.message);
  }
};

const profileupdate = async (req, res) => {
  try {
    const { fullname, email, phone_Number, bio, skill } = req.body;
    const file = req.file; // multer file

    if (!fullname || !email || !phone_Number || !bio || !skill) {
      return res.status(400).json({
        message: "There Is Something Missing ..",
        success: false,
      });
    }

    const userid = req.userid;

    let user = await Userschema.findById(userid);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }

    // Optional: check if new email is already used by another user
    const existUser = await Userschema.findOne({ email });
    if (existUser && existUser._id.toString() !== userid) {
      return res.status(400).json({
        message: "Email already in use",
        success: false,
      });
    }

    // Update fields
    user.fullname = fullname;
    user.email = email;
    user.phone_Number = phone_Number;

    user.profile.bio = bio;

    if (Array.isArray(skill)) {
      user.profile.skill = skill;
    } else {
      user.profile.skill = skill.split(",").map((s) => s.trim());
    }

    // Optional: save profile picture if uploaded
    if (file) {
      user.profile.photo = file.path; // adjust based on multer storage
    }

    await user.save();

    user.password = undefined;

    const updatedUser = {
      userid: user._id,
      fullname: user.fullname,
      email: user.email,
      phone_Number: user.phone_Number,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Updated Successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Profile Update Error: ${error.message}`,
      success: false,
    });
  }
};
module.exports = { usersignup, userlogin, userlogout, profileupdate };

