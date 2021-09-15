import nc from "next-connect";
import connectDB from "config/dbConnect";
import { registerUser } from "@/controllers/auth";
import { notFound, errorHandler } from "@/middlewares/errorMiddleware";

const handler = nc({ notFound, errorHandler });
connectDB();
handler.post(registerUser);
export default handler;
