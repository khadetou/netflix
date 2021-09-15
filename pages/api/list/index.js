import nc from "next-connect";
import connectDB from "config/dbConnect";
import { getList, createList, deletList } from "@/controllers/list";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated, isAdmin } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();

handler.get(getList);
handler.use(isAuthenticated, isAdmin).post(createList).delete(deletList);

export default handler;
