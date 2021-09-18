import nc from "next-connect";
import connectDB from "config/dbConnect";
import { createMovie, getAllMovie } from "@/controllers/movie";
import onError from "@/middlewares/errorMiddleware";
import { isAdmin, isAuthenticated } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();

handler.use(isAuthenticated).get(getAllMovie);
handler.use(isAuthenticated, isAdmin).post(createMovie);

export default handler;
