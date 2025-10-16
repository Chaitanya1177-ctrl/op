import User from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helper/authhelper.js";

// ✅ Register
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already registered, please login",
      });
    }

    const hashed = await hashPassword(password);

    const user = await new User({
      name,
      email,
      password: hashed,
      phone,
      address,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully ✅",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// ✅ Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found, please register first",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    res.status(200).send({
      success: true,
      message: "Login successful ✅",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};













