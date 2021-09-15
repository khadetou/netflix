import nc from "next-connect";
import connectDB from "config/dbConnect";
import { deletList } from "@/controllers/list";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated, isAdmin } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();

handler.use(isAuthenticated, isAdmin).delete(deletList);

export default handler;
