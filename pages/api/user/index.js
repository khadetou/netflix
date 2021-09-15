import nc from "next-connect";
import connectDB from "config/dbConnect";
import { getUser } from "@/controllers/auth";
import { notFound, errorHandler } from "@/middlewares/errorMiddleware";
import { isAuthenticated } from "@/middlewares/auth";

const handler = nc({ notFound, errorHandler });
connectDB();

handler.use(isAuthenticated).get(getUser);

export default handler;
