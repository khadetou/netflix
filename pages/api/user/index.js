import nc from "next-connect";
import connectDB from "config/dbConnect";
import { getUser } from "@/controllers/auth";
import {
  deletUser,
  getAllUsers,
  getUserStat,
  updateUser,
} from "@/controllers/user";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated, isAdmin } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();

handler.use(isAuthenticated).get(getUser).put(updateUser);
handler.use(isAuthenticated, isAdmin).get(getAllUsers).get(getUserStat);
handler.use(isAuthenticated).delete(deletUser);
export default handler;
