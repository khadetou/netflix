import nc from "next-connect";
import connectDB from "config/dbConnect";
import { getMovie, updateMovie, deletMovie } from "@/controllers/movie";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated, isAdmin } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();

handler.use(isAuthenticated).get(getMovie);

handler.use(isAuthenticated, isAdmin).delete(deletMovie).put(updateMovie);

export default handler;
