import nc from "next-connect";
import connectDB from "config/dbConnect";
import { getRandomMovie } from "@/controllers/movie";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();

handler.use(isAuthenticated).get(getRandomMovie);

export default handler;
