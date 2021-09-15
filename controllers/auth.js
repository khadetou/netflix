import User from "@/models/User";
import bcryptjs from "bcryptjs";
import asyncHandler from "express-async-handler";

//@Desc register user
//@Route Post/api/auth/register

export const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    throw Error("A user with this email already exist!");
  }

  const salt = await bcryptjs.genSalt(10);
  password = await bcryptjs.hash(password, salt);
  user = await User.create({
    name,
    email,
    password,
  });
  res.status(200).json(user);
});

//@Desc get User
//@Route get/api/user

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json(user);
});
