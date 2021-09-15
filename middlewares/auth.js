import asyncHandler from "@/middlewares/asyncHandler";
import User from "@/models/User";
import { getSession } from "next-auth/client";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    throw new Error("You need to be authenticated first");
  }

  req.user = session.user;
  next();
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user && user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw Error("Not authorized !");
  }
});
