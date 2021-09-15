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

handler.get(getUser);
handler.use(isAuthenticated).get(getAllUsers).delete(deletUser);
export default handler;
