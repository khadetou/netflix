import nc from "next-connect";
import connectDB from "config/dbConnect";
import { getUser } from "@/controllers/auth";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();

handler.get(getUser);

export default handler;
