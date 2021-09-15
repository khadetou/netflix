import asyncHandler from "express-async-handler";
import { getSession } from "next-auth/client";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const session = await getSession({ req });
  if (!session) {
    throw new Error("You need to be authenticated first");
  }

  req.user = session.user;
  next();
});
