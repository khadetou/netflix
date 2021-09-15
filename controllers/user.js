import User from "@/models/User";
import asyncHandler from "@/middlewares/asyncHandler";
import bcryptjs from "bcryptjs";
//@desc Update user
//@route put/api/user/:id
//@Access private

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { name, email, password } = req.body;

  if (user) {
    user.name = name;
    user.email = email;
    if (password) {
      //Encrypt Password
      const salt = await bcryptjs.genSalt(10);
      password = await bcryptjs.hash(password, salt);
      user.password = password;
    }
  }

  await user.save();

  res.status(200).json({
    success: true,
  });
});

//@Desc delete a user
//@route delete/api/user/:id
//@Protect user is admin

export const deletUser = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw Error("User not found");
  }

  await user.remove();
  res.json({ message: "User removed successfully!" });
});

//@Desc get All Users
//@route Get/api/user
//@Access private isAdmin

export const getAllUsers = asyncHandler(async (req, res) => {
  const query = req.query.new;

  const users = query
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find();

  res.json(users);
});

//@Desc get user Statat
//@route Get/api/user
//@Access private isAdmin

export const getUserStat = asyncHandler(async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);
  const data = User.aggregate([
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);

  res.json(data);
});
