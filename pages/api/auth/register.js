import nc from "next-connect";
import connectDB from "config/dbConnect";
import { registerUser } from "@/controllers/auth";
import onError from "@/middlewares/errorMiddleware";

const handler = nc({ onError });

connectDB();
handler.post(registerUser);

export default handler;
