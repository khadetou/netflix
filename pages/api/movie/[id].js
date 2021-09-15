import nc from "next-connect";
import connectDB from "config/dbConnect";
import {
  createMovie,
  getAllMovie,
  getMovie,
  updateMovie,
  getRandomMovie,
  deletMovie,
} from "@/controllers/movie";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated, isAdmin } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();

handler
  .use(isAuthenticated)
  .get(getAllMovie)
  .get(getMovie)
  .get(getRandomMovie)
  .post(createMovie);

handler.use(isAuthenticated, isAdmin).delete(deletMovie).put(updateMovie);

export default handler;
